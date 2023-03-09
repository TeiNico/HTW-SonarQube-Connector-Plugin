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

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setSonarToken', async function () {
		sonarToken = await vscode.window.showInputBox({ placeHolder: "Gebe deinen SonarQube Token ein:" });
		vscode.window.showInformationMessage('SonarQube Token wurde hinzugefügt:', sonarToken)
	}));

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setImmaNr', async function () {
		immaNr = await vscode.window.showInputBox({ placeHolder: "Gebe deine Matrikelnummer ein:" });
		vscode.window.showInformationMessage('SonarQube Token wurde hinzugefügt:', immaNr)
	}));

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.initializeProjects', async function () {
		if (sonarToken === null || immaNr === null) {
			vscode.window.showWarningMessage("SonarQube Token oder Matrikelnummer ist nicht angegeben.")
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
			if(newProject){
				vscode.window.showInformationMessage('Projekte wurden angelegt. 🎉')
			} else {
				vscode.window.showInformationMessage('Alle Projecte waren bereits angelegt.')
			}
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.setQualityProfile', async function () {
		if (sonarToken === null || immaNr === null) {
			vscode.window.showWarningMessage("SonarQube Token oder Matrikelnummer ist nicht angegeben.")
		} else {
			let res = await getProjects(baseUrl, sonarToken);
			console.log(res)
			projects = res.data.components.map(project => {
				return {
					label: project.key,
					detail: project.name.replace(immaNr+'_', '')
				}
			});

			let project = await vscode.window.showQuickPick(projects, {
				matchOnDetail: true,
			})

			if (project == null) return;

			let qualityProfile = await vscode.window.showQuickPick(qualityProfiles, {
				matchOnDetail: true,
			})

			if (qualityProfile == null) return;

			await setQualityProfile(baseUrl, sonarToken, project.label, qualityProfile.key)
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('htw-sonarqube-connector-plugin.runAnalysis', async function () {
		if (sonarToken === null || immaNr === null) {
			vscode.window.showWarningMessage("SonarQube Token oder Matrikelnummer ist nicht angegeben.")
		} else {
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

			let cmd = `sonar-scanner.bat -D"sonar.projectKey=${project.label}" -D"sonar.sources=src" -D"sonar.java.binaries=bin" -D"sonar.host.url=${baseUrl}" -D"sonar.login=${sonarToken}"`

			const terminal = vscode.window.createTerminal('Run Analyses')
			terminal.sendText(cmd)
			terminal.show()
			let openInBrowser = await vscode.window.showInformationMessage("Ergebniss im Browser öffnen?", "Öffnen", "Schließen")

			if (openInBrowser === "Öffnen") vscode.env.openExternal(vscode.Uri.parse(`${baseUrl}/dashboard?id=` + project.label))
		}
	}));
}

function deactivate() { }

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
	const res = await axios(config).catch(error => { console.log(error); vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
	return res
}

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
	let res = await axios(config).catch(error => { vscode.window.showErrorMessage(error.message, error.response.data.errors[0].msg) });
	return (res)
}

module.exports = {
	activate,
	deactivate
}
