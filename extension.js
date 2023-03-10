const vscode = require('vscode');
const axios = require('axios');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// const baseUrl = 'http://localhost:9000'
	const baseUrl = 'https://nico-teichert.tech'
	let sonarToken = null;
	let immaNr = null;
	let projects = null;
	let pathToScanner = null;

	let immaNrStatusbBarItem;
	let sonarTokenStatusbBarItem;
	let runAnalysisStatusbBarItem;
	let setQualityProfileStatusBarItem;
	let initializeProjectsStatusBarItem;

	// Sample tasks
	const aufgaben = [
		{
			label: 'Aufgabe 1',
			key: 'Aufgabe-1'
		},
		{
			label: 'Aufgabe 2',
			key: 'Aufgabe-2'
		},
		{
			label: 'Aufgabe 3',
			key: 'Aufgabe-3'
		}
	]

	// Existing QualityProfiles in SonarQube
	const qualityProfiles = [
		{
			label: "Aufgabe 1 - Standard",
			key: "HTW Aufgabe 1 - Standard"
		},
		{
			label: "Aufgabe 1 - Detailed",
			key: "HTW Aufgabe 1 - Detailed"
		},
		{
			label: "Aufgabe 2 - Standard",
			key: "HTW Aufgabe 2 - Standard"
		},
		{
			label: "Aufgabe 2 - Detailed",
			key: "HTW Aufgabe 2 - Detailed"
		},
		{
			label: "Aufgabe 3 - Standard",
			key: "HTW Aufgabe 3 - Standard"
		},
		{
			label: "Aufgabe 3 - Detailed",
			key: "HTW Aufgabe 3 - Detailed"
		}
	]

	console.log('ACTIVATED');

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.activatePlugin', async function () {
		vscode.window.showInformationMessage("Plugin aktiviert 🚀")
	}));

	immaNrStatusbBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	immaNrStatusbBarItem.command = 'htw-sonarqube-connector-plugin.setImmaNr';
	immaNrStatusbBarItem.text = "Matrikelnummer: ❌"
	context.subscriptions.push(immaNrStatusbBarItem)
	immaNrStatusbBarItem.show();

	sonarTokenStatusbBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
	sonarTokenStatusbBarItem.command = 'htw-sonarqube-connector-plugin.setSonarToken';
	sonarTokenStatusbBarItem.text = "SonarQube Token: ❌"
	context.subscriptions.push(sonarTokenStatusbBarItem)
	sonarTokenStatusbBarItem.show();

	runAnalysisStatusbBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 98);
	runAnalysisStatusbBarItem.command = 'htw-sonarqube-connector-plugin.runAnalysis';
	runAnalysisStatusbBarItem.text = "Analyse durchführen ❌"
	context.subscriptions.push(runAnalysisStatusbBarItem)
	runAnalysisStatusbBarItem.show();

	setQualityProfileStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 97);
	setQualityProfileStatusBarItem.command = 'htw-sonarqube-connector-plugin.setQualityProfile';
	setQualityProfileStatusBarItem.text = "QualityProfil ändern ❌"
	context.subscriptions.push(setQualityProfileStatusBarItem)
	setQualityProfileStatusBarItem.show();

	initializeProjectsStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 96);
	initializeProjectsStatusBarItem.command = 'htw-sonarqube-connector-plugin.initializeProjects';
	initializeProjectsStatusBarItem.text = "Projekte erstellen 🔨"
	context.subscriptions.push(initializeProjectsStatusBarItem)

	/**
	 * Command to set the SonarQube Token in VSCode
	 */
	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setSonarToken', async function () {
		sonarToken = await vscode.window.showInputBox({ placeHolder: "Gebe deinen SonarQube Token ein:" });
		let validTokenRequest = await validateToken(baseUrl, sonarToken)
		if (validTokenRequest.data.valid) {
			vscode.window.showInformationMessage('✅ SonarQube Token wurde hinzugefügt:', sonarToken)
			sonarTokenStatusbBarItem.text = "SonarQube Token: ✅"
			if(immaNr !== null) {
				initializeProjectsStatusBarItem.show(); 
				setQualityProfileStatusBarItem.text = "QualityProfil ändern 🕵️‍♂️"
			}
		} else {
			sonarToken = null;
			vscode.window.showWarningMessage("❗ Login mit angegebenem SonarQube Token nicht möglich. ❗")
			sonarTokenStatusbBarItem.text = "SonarQube Token: ❌"
		}
	}));

	/**
	 * Command to set the registration number in VSCode
	 */
	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setImmaNr', async function () {
		immaNr = await vscode.window.showInputBox({ placeHolder: "Gebe deine Matrikelnummer ein:" });
		if (RegExp(/\bs0([1-9]{6})\b/gm).test(immaNr)) {
			vscode.window.showInformationMessage('✅ Matrikelnummer wurde hinzugefügt:', immaNr)
			immaNrStatusbBarItem.text = "Matrikelnummer: " + immaNr + ' ✅'
			if(sonarToken !== null){
				initializeProjectsStatusBarItem.show(); 
				setQualityProfileStatusBarItem.text = "QualityProfil ändern 🕵️‍♂️"
			} 
		} else {
			immaNr = null
			vscode.window.showInformationMessage('❗ Matrikelnummer nicht gültig. ❗')
			immaNrStatusbBarItem.text = "Matrikelnummer: ❌"
		}


	}));

	/**
	 * Command to initialize all sample projects (Aufgabe 1 - Aufgabe 3)
	 * Skip if they already exist in SonarQube
	 */
	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.initializeProjects', async function () {
		if (sonarToken === null || immaNr === null || sonarToken === undefined || immaNr === undefined) {
			if (sonarToken === null) vscode.window.showWarningMessage("❗ Gib deinen SonarQube Token an. ❗")
			if (immaNr === null) vscode.window.showWarningMessage("❗ Gib deine Matrikelnummer an. ❗")
		} else {
			let newProject = false;
			for (aufgabe of aufgaben) {
				let projectName = immaNr + '_' + aufgabe.key
				let res = await createProjects(baseUrl, sonarToken, projectName)
				console.log(res)
				if (res) {
					newProject = true
					let qualityProfile = `HTW ${aufgabe.label} - Standard`
					await setQualityProfile(baseUrl, sonarToken, projectName, qualityProfile)
				}
			}
			if (newProject) {
				vscode.window.showInformationMessage('🎉 Projekte wurden angelegt. 🎉')
			} else {
				vscode.window.showInformationMessage('Alle Projekte waren bereits angelegt.')
			}
		}
	}));

	/**
	 * Command for setting a chosen qualityprofile for a chosen project in SonarQube
	 */
	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setQualityProfile', async function () {
		if (sonarToken === null || immaNr === null || sonarToken === undefined || immaNr === undefined) {
			if (sonarToken === null) vscode.window.showWarningMessage("❗ Gib deinen SonarQube Token an. ❗")
			if (immaNr === null) vscode.window.showWarningMessage("❗ Gib deine Matrikelnummer an. ❗")
		} else {
			let res = await getProjects(baseUrl, sonarToken);
			console.log(res)
			projects = res.data.components.map(project => {
				return {
					label: project.key,
					detail: project.name.replace(immaNr + '_', '').replace('-', ' ')
				}
			});

			// Creates QuickPick with projects from user
			let project = await vscode.window.showQuickPick(projects, {
				matchOnDetail: true,
			})

			if (project == null) return;

			// Creates QuickPick with given QualityProfiles
			let qualityProfile = await vscode.window.showQuickPick(qualityProfiles.filter(qp => qp.label.startsWith(project.detail)), {
				matchOnDetail: true,
			})

			if (qualityProfile == null) return;

			await setQualityProfile(baseUrl, sonarToken, project.label, qualityProfile.key)
		}
	}));

	/**
	 * Command to run a code analysis in SonarQube
	 */
	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.runAnalysis', async function () {
		if (sonarToken === null || immaNr === null || sonarToken === undefined || immaNr === undefined) {
			if (sonarToken === null) vscode.window.showWarningMessage("❗ Gib deinen SonarQube Token an. ❗")
			if (immaNr === null) vscode.window.showWarningMessage("❗ Gib deine Matrikelnummer an. ❗")
		} else {

			if (pathToScanner == null || pathToScanner == undefined) {
				let selectedFile = await vscode.window.showOpenDialog({ title: "Select sonar-scanner", canSelectMany: false });
				let selectedFileName = selectedFile[0].path.split('/').pop()
				if (selectedFileName.startsWith('sonar-scanner')) {
					pathToScanner = selectedFile[0].path.replace(/\//g, '\\').substring(1)
					runAnalysisStatusbBarItem.text = "Analyse durchführen 🚀"

				} else {
					vscode.window.showWarningMessage("❗ Wähle die Datei 'sonar-scanner' aus. ❗")
					pathToScanner = null
				}
			}
			if (pathToScanner != null || pathToScanner != undefined) {
				let res = await getProjects(baseUrl, sonarToken);
				console.log(res)
				projects = res.data.components.map(project => {
					return {
						label: project.key,
						detail: project.name
					}
				});

				let project = await vscode.window.showQuickPick(projects, {
					matchOnDetail: true,
				})

				if (project == null) return;

				let cmd = `${pathToScanner} -D"sonar.projectKey=${project.label}" -D"sonar.sources=src" -D"sonar.java.binaries=bin" -D"sonar.host.url=${baseUrl}" -D"sonar.login=${sonarToken}"`

				const terminal = vscode.window.createTerminal('Run Analyses')
				terminal.sendText(cmd)
				terminal.show()
				let openInBrowser = await vscode.window.showInformationMessage("Ergebnis im Browser öffnen?", "Öffnen", "Schließen")
				if (openInBrowser === "Öffnen") vscode.env.openExternal(vscode.Uri.parse(`${baseUrl}/dashboard?id=` + project.label))
			}
		}
	}));
}

function deactivate() { }

/**
 * Function to get all projects from specific user
 * @param {*} baseUrl 
 * @param {*} token 
 * @returns user projects
 */
async function getProjects(baseUrl, token) {
	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${baseUrl}/api/components/search?qualifiers=TRK`,
		headers: {
			'Authorization': `Basic ${Buffer.from(token + ':', 'utf-8').toString('base64')}`
		}
	};
	console.log(config)
	return await axios(config).catch(error => { console.log(error); vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
}

/**
 * Function which sets the QualityProfile for specific project
 * @param {*} baseUrl 
 * @param {*} token 
 * @param {*} projectName 
 * @param {*} qualityProfile 
 */
async function setQualityProfile(baseUrl, token, projectName, qualityProfile) {
	var config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${baseUrl}/api/qualityprofiles/add_project?language=java&project=${projectName}&qualityProfile=${qualityProfile}`,
		headers: {
			'Authorization': `Basic ${Buffer.from(token + ':', 'utf-8').toString('base64')}`
		}
	};
	let res = await axios(config).catch(error => { console.log(error); vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
	console.log(res)
}

/**
 * Function for creating a project in SonarQube
 * @param {*} baseUrl 
 * @param {*} token 
 * @param {*} projectName 
 * @returns 
 */
async function createProjects(baseUrl, token, projectName) {
	console.log(projectName)
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: `${baseUrl}/api/projects/create?name=${projectName}&project=${projectName}`,
		headers: {
			'Authorization': `Basic ${Buffer.from(token + ':', 'utf-8').toString('base64')}`
		}
	}
	return await axios(config).catch(error => { vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
}

async function validateToken(baseUrl, token) {
	let config = {
		method: 'get',
		maxBodyLength: Infinity,
		url: `${baseUrl}/api/authentication/validate`,
		headers: {
			'Authorization': `Basic ${Buffer.from(token + ':', 'utf-8').toString('base64')}`
		}
	}
	return await axios(config).catch(error => { vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
}

module.exports = {
	activate,
	deactivate
}
