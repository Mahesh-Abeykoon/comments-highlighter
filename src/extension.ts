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
import { todoRegex } from './regex';
import { getWebviewContent } from './webview';
import { extractComments } from './comment-utils';

let panel: vscode.WebviewPanel | undefined = undefined;

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

    const updateEditorDecorations = (editor: vscode.TextEditor | undefined) => {
        if (editor) {
            updateDecorations(editor, todoRegex, decorationTypes);
        }
    };

    const statusBarButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarButton.text = '$(comment) Highlights';
    statusBarButton.command = 'commentsHighlighter.showCommentsSidebar';
    statusBarButton.show();
    context.subscriptions.push(statusBarButton);

    vscode.commands.registerCommand('commentsHighlighter.showCommentsSidebar', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const comments = extractComments(editor.document.getText(), editor.document);
            if (panel && panel.visible) {
                panel.webview.html = getWebviewContent(comments);
                panel.reveal(vscode.ViewColumn.Beside);
            } else {
                panel = vscode.window.createWebviewPanel(
                    'actionableComments',
                    'Actionable Comments',
                    vscode.ViewColumn.Beside,
                    {
                        enableScripts: true,
                        retainContextWhenHidden: true,
                    }
                );

                panel.webview.html = getWebviewContent(comments);
                panel.onDidDispose(() => {
                    panel = undefined;
                });

                panel.reveal(vscode.ViewColumn.Beside);
            }
        }
    });

    vscode.workspace.onDidChangeTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const comments = extractComments(editor.document.getText(), editor.document);
            if (panel && panel.visible) {
                panel.webview.html = getWebviewContent(comments);
            }
        }
    });

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        updateEditorDecorations(editor);
    });

    vscode.workspace.onDidOpenTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        updateEditorDecorations(editor);
    });
}

export function deactivate() {}
