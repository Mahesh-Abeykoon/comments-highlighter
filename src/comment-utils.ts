import * as vscode from 'vscode';
import { todoRegex } from './regex';
import { Comments } from './types';

export function extractComments(text: string, document: vscode.TextDocument): Comments[] {
    const matches = text.match(todoRegex);
    const comments: Comments[] = [];
    if (matches) {
        matches.forEach((match) => {
            const lineNumber = document.positionAt(text.indexOf(match)).line;
            comments.push({ text: match, line: lineNumber, file: document.fileName });
        });
    }
    return comments;
}
