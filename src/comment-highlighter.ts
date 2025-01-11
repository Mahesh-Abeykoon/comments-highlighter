import * as vscode from 'vscode';

export function updateDecorations(editor: vscode.TextEditor, todoRegex: RegExp, decorationTypes: { [key: string]: vscode.TextEditorDecorationType }) {
    const text = editor.document.getText();
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
        const taskType = match[1];
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);

        if (decorations[taskType]) {
            decorations[taskType].push({
                range: new vscode.Range(startPos, endPos),
            });
        }
    }

    Object.keys(decorations).forEach((taskType) => {
        editor.setDecorations(decorationTypes[taskType], decorations[taskType]);
    });
}
