import Lexer from "./lexer.mjs";
import Parser from "./parser.mjs";
import Transformer from "./transformer.mjs";
import Generator from "./generator.mjs";

const tokens = Lexer(`
Paper 20 
Pen 100 
Line 100 50 300 50
Line 300 50 100 250
Line 100 250 100 50
Circle 200 250 100
`);

const ast = Parser(tokens);
const transformed_ast = Transformer(ast);

const svg = Generator(transformed_ast);

console.log(svg);

document.body.innerHTML = svg;
