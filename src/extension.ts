import * as vscode from 'vscode';
import { 
    todoDecorationType, 
    taskDecorationType, 
    fixmeDecorationType, 
    noteDecorationType, 
    hackDecorationType, 
    bugDecorationType, 
    issueDecorationType 
} from './decoration-styles';
import { updateDecorations } from './comment-highlighter';

export function activate(context: vscode.ExtensionContext) {
    console.log('TODO Highlighter is now active!');

    const decorationTypes = {
        TODO: todoDecorationType,
        FIXME: fixmeDecorationType,
        NOTE: noteDecorationType,
        TASK: taskDecorationType,
        HACK: hackDecorationType,
        BUG: bugDecorationType,
        ISSUE: issueDecorationType,
    };

    const todoRegex = /\/\/\s*(TODO|FIXME|NOTE|HACK|BUG|ISSUE|TASK)\s*:?.*/gi;

    const updateEditorDecorations = (editor: vscode.TextEditor | undefined) => {
        if (editor) {
            updateDecorations(editor, todoRegex, decorationTypes);
        }
    };

    // Attach event listeners with checks for active text editor
    vscode.workspace.onDidChangeTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        updateEditorDecorations(editor);
    });

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        updateEditorDecorations(editor);
    });

    vscode.workspace.onDidOpenTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        updateEditorDecorations(editor);
    });

    let disposable = vscode.commands.registerCommand('todoHighlighter.helloWorld', () => {
        vscode.window.showInformationMessage('TODO Highlighter is active!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
