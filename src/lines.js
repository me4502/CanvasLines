"use strict";

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.nodeList = []
    }

    get nodes() {
        return this.nodeList;
    }

    addNode(node) {
        this.nodeList.push(node);
    }
}

let nodes = [];

const startNode = new Node(window.innerWidth / 2 - 10, window.innerHeight / 2 - 10);
const secondNode = new Node(window.innerWidth / 2 + 10, window.innerHeight / 2 + 10);
startNode.addNode(secondNode);

nodes.push(startNode);
nodes.push(secondNode);

const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

function fullRedraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    const lineargradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    lineargradient.addColorStop(0, '#d3f5ff');
    lineargradient.addColorStop(1, '#00ffae');
    ctx.strokeStyle = lineargradient;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].nodes.length; j++) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[i].nodes[j].x, nodes[i].nodes[j].y);
            ctx.stroke();
        }
    }
}

function drawChanged(newNodes) {
    const lineargradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    lineargradient.addColorStop(0, '#d3f5ff');
    lineargradient.addColorStop(1, '#00ffae');
    ctx.strokeStyle = lineargradient;
    for (let i = 0; i < newNodes.length; i++) {
        for (let j = 0; j < newNodes[i].nodes.length; j++) {
            ctx.moveTo(newNodes[i].x, newNodes[i].y);
            ctx.lineTo(newNodes[i].nodes[j].x, newNodes[i].nodes[j].y);
            ctx.stroke();
        }
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fullRedraw();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

canvas.addEventListener("click", function(e) {
    let newNode = new Node(e.clientX, e.clientY);
    let closestNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        closestNodes.push(nodes[i]);

        if (closestNodes.length > 3) {
            let furtherestDistance = 0;
            let furtherestNode = -1;
            for (let j = 0; j < closestNodes.length; j++) {
                let currentDistance = Math.pow(newNode.x - closestNodes[j].x, 2) + Math.pow(newNode.y - closestNodes[j].y, 2);
                if (furtherestNode === -1) {
                    furtherestNode = j;
                    furtherestDistance = currentDistance;
                } else if (currentDistance > furtherestDistance) {
                    furtherestDistance = currentDistance;
                    furtherestNode = j;
                }
            }

            closestNodes.splice(furtherestNode, 1);
        }
    }
    for (let i = 0; i < closestNodes.length; i++) {
        newNode.addNode(closestNodes[i]);
    }
    nodes.push(newNode);
    drawChanged([newNode]);
});
