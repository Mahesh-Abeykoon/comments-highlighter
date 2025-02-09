import * as vscode from 'vscode';

export const todoDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#FFE5B4',
    color: '#8B4513',
    border: '1px solid #D2691E',
    borderRadius: '6px',
});

export const taskDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#1C4D6F',
    color: '#A7D8F0',
    border: '1px solid #2E91C1',
    borderRadius: '6px',
});

export const fixmeDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#4E1E1E',
    color: '#FF6B6B',
    border: '1px solid #C0392B',
    borderRadius: '6px',
});

export const noteDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#1E3E24',
    color: '#A4E7A2',
    border: '1px solid #45A049',
    borderRadius: '6px',
});

export const hackDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#4A3F1E',
    color: '#F4D03F',
    border: '1px solid #CDAA2F',
    borderRadius: '6px',
});

export const bugDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#502D2D',
    color: '#FF9A76',
    border: '1px solid #D35400',
    borderRadius: '6px',
});

export const issueDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#552525',
    color: '#FF8F66',
    border: '1px solid #BF360C',
    borderRadius: '6px',
});
