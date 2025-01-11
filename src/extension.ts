import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('TODO Highlighter is now active!');

    const todoDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#fff9c4',  
        color: '#000',  
        border: '1px solid rgba(248, 34, 141, 0.8)',
        borderRadius: '6px',
    });

	const taskDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#d3f8e2', 
        color: '#000',
        border: '1px solid rgba(31, 162, 202, 0.8)',
        borderRadius: '6px',
    });

    const fixmeDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#ffcccb',
        color: '#000',
        border: '1px solid rgba(255, 0, 0, 0.8)',
        borderRadius: '6px',
    });

    const noteDecorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: '#d3f8e2', 
        color: '#000',
        border: '1px solid rgba(0, 255, 0, 0.8)',
        borderRadius: '6px',
    });

    vscode.workspace.onDidChangeTextDocument(updateDecorations);
    vscode.window.onDidChangeActiveTextEditor(updateDecorations);
    vscode.workspace.onDidOpenTextDocument(updateDecorations);

    function updateDecorations() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const text = editor.document.getText();
        const todoRegex = /\/\/\s*(TODO|FIXME|NOTE|HACK|BUG|ISSUE|TASK)\s*:?.*/gi; 

        const decorations: { [key: string]: vscode.DecorationOptions[] } = {
            TODO: [],
            FIXME: [],
            NOTE: [],
            HACK: [],
            BUG: [],
            ISSUE: [],
            TASK: [],
        };

        let match;
        while ((match = todoRegex.exec(text))) {
            console.log(`Found: ${match[0]}`);

            const taskType = match[1];  
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);

            if (decorations[taskType]) {
                decorations[taskType].push({
                    range: new vscode.Range(startPos, endPos),
                });
            }
        }

        // Apply decorations based on task type
        editor.setDecorations(todoDecorationType, decorations['TODO']);
        editor.setDecorations(fixmeDecorationType, decorations['FIXME']);
        editor.setDecorations(noteDecorationType, decorations['NOTE']);
		editor.setDecorations(taskDecorationType, decorations['TASK']);


        console.log(`Decorations: ${Object.values(decorations).flat().length}`); 
    }

    updateDecorations();

    let disposable = vscode.commands.registerCommand('todoHighlighter.helloWorld', () => {
        vscode.window.showInformationMessage('TODO Highlighter is active!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
