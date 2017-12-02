export default function transformer(ast) {
  var svg_ast = {
    tag: "svg",
    attr: {
      width: 400,
      height: 400,
      viewBox: "0 0 400 400",
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1"
    },
    body: []
  };

  var pen_color = 100; // default pen color is black

  // Extract a call expression at a time as `node`. Loop until we are out of expressions in body.
  while (ast.body.length > 0) {
    var node = ast.body.shift();
    switch (node.name) {
      case "Paper":
        var paper_color = 100 - node.arguments[0].value;
        svg_ast.body.push({
          // add rect element information to svg_ast's body
          tag: "rect",
          attr: {
            x: 0,
            y: 0,
            width: 400,
            height: 400,
            fill: "rgb(" + paper_color + "%," + paper_color + "%," + paper_color + "%)"
          }
        });
        break;
      case "Pen":
        pen_color = 100 - node.arguments[0].value; // keep current pen color in `pen_color` variable
        break;
      case "Line":
        // add line element information to svg_ast's body
        svg_ast.body.push({
          tag: "line",
          attr: {
            x1: node.arguments[0].value,
            y1: node.arguments[1].value,
            x2: node.arguments[2].value,
            y2: node.arguments[3].value,
            "stroke-linecap": "round",
            "stroke-width": "3px",
            stroke: "rgb(" + pen_color + "%," + pen_color + "%," + pen_color + "%)"
          }
        });
        break;
      case "Circle":
        // add circle element information to svg_ast's body
        svg_ast.body.push({
          tag: "circle",
          attr: {
            cx: node.arguments[0].value,
            cy: node.arguments[1].value,
            r: node.arguments[2].value,
            fill: "white",
            "stroke-width": "2px",
            stroke: "rgb(" + pen_color + "%," + pen_color + "%," + pen_color + "%)"
          }
        });
        break;
    }
  }
  return svg_ast;
}
