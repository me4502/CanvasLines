"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node(x, y) {
        _classCallCheck(this, Node);

        this.x = x;
        this.y = y;
        this.nodeList = [];
    }

    _createClass(Node, [{
        key: "addNode",
        value: function addNode(node) {
            this.nodeList.push(node);
        }
    }, {
        key: "nodes",
        get: function get() {
            return this.nodeList;
        }
    }]);

    return Node;
}();

var nodes = [];

var startNode = new Node(window.innerWidth / 2 - 10, window.innerHeight / 2 - 10);
var secondNode = new Node(window.innerWidth / 2 + 10, window.innerHeight / 2 + 10);
startNode.addNode(secondNode);

nodes.push(startNode);
nodes.push(secondNode);

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

function onChange() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    var lineargradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    lineargradient.addColorStop(0, '#d3f5ff');
    lineargradient.addColorStop(1, '#00ffae');
    ctx.strokeStyle = lineargradient;
    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].nodes.length; j++) {
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[i].nodes[j].x, nodes[i].nodes[j].y);
            ctx.stroke();
        }
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    onChange();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas, false);

canvas.addEventListener("click", function (e) {
    var newNode = new Node(e.clientX, e.clientY);
    var closestNodes = [];
    for (var i = 0; i < nodes.length; i++) {
        closestNodes.push(nodes[i]);

        if (closestNodes.length > 3) {
            var furtherestDistance = 99999999;
            var furtherestNode = -1;
            for (var j = 0; j < closestNodes.length; j++) {
                var currentDistance = Math.pow(newNode.x - closestNodes[j].x, 2) + Math.pow(newNode.y - closestNodes[j].y, 2);
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
    for (var _i = 0; _i < closestNodes.length; _i++) {
        newNode.addNode(closestNodes[_i]);
    }
    nodes.push(newNode);
    onChange();
});