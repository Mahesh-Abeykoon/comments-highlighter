import * as vscode from 'vscode';
export function updateDecorations(
    editor: vscode.TextEditor, 
    regex: RegExp, 
    decorationTypes: Record<string, vscode.TextEditorDecorationType>
) {
    if (!editor) return;

    const text = editor.document.getText();
    const decorations: Record<string, vscode.DecorationOptions[]> = {
        TODO: [],
        FIXME: [],
        NOTE: [],
        TASK: [],
        HACK: [],
        BUG: [],
        ISSUE: [],
    };

    let match;
    while ((match = regex.exec(text))) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const type = match[2]?.toUpperCase();

        if (decorations[type]) {
            decorations[type].push({ range: new vscode.Range(startPos, endPos) });
        }
    }

    // Apply each decoration type separately
    Object.keys(decorationTypes).forEach((key) => {
        editor.setDecorations(decorationTypes[key], decorations[key] || []);
    });
}
