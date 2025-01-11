import * as vscode from 'vscode';

export const todoDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#f0f4c3', 
    color: '#3e2723',
    border: '1px solid rgba(255, 193, 7, 0.8)',
    borderRadius: '6px',
});

export const taskDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#b3e5fc',
    color: '#01579b',
    border: '1px solid rgba(33, 150, 243, 0.8)',
    borderRadius: '6px',
});

export const fixmeDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#ffcdd2',
    color: '#d32f2f',
    border: '1px solid rgba(244, 67, 54, 0.8)',
    borderRadius: '6px',
});

export const noteDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
    border: '1px solid rgba(56, 142, 60, 0.8)',
    borderRadius: '6px',
});

export const hackDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#fff9c4',
    color: '#fbc02d',
    border: '1px solid rgba(253, 216, 53, 0.8)',
    borderRadius: '6px',
});

export const bugDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#ffccbc',
    color: '#e64a19',
    border: '1px solid rgba(255, 87, 34, 0.8)',
    borderRadius: '6px',
});

export const issueDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#c8e6c9',
    color: '#388e3c',
    border: '1px solid rgba(139, 195, 74, 0.8)',
    borderRadius: '6px',
});
