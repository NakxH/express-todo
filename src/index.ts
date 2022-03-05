import bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
const app = express();
const port = 3000; // default port to listen
app.use(bodyParser.json())

// define a route handler for the default home page
// app.get( "/", ( req: Request, res: Response ) => {
//     res.send( "Hello world!" );
// } );

interface ITodo {
    id: number,
    text: string,
    completed: boolean,
}

const todos: ITodo[] = [
    {
        id: 0,
        text: "Make Tea",
        completed: false,
    },
    {
        id: 1,
        text: "Have a shower",
        completed: false,
    },
    {
        id: 2,
        text: "Read Book",
        completed: false,
    }
];

app.post( "/todo", ( req: Request, res: Response ) => {
    const todo = {
        id: todos.length + 1,
        text: req.body.text,
        completed: false,
    }

    todos.push(todo)
    res.send( todos );
} );

app.get( "/todo", ( req: Request, res: Response ) => {
    res.send( todos );
} );

app.get( "/todo/:id", ( req: Request, res: Response ) => {
    const todo = todos.find( (todo) => todo.id === parseInt(req.params.id, 10));
    res.send( todo );
} );

app.put( "/todo/:id", ( req: Request, res: Response ) => {
    const todo = todos.find( (todo) => todo.id === parseInt(req.params.id, 10));
    todo.text = req.body.text
    todo.completed = req.body.completed
    res.send( todo );
} );

app.delete( "/todo/:id", ( req: Request, res: Response ) => {
    const todoIndex = todos.findIndex( (todo) => todo.id === parseInt(req.params.id, 10));
    todos.splice(todoIndex, 1);
    res.send( todos );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );