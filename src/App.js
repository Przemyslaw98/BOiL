import React from 'react';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import {zad1} from './zadanie1'
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import numeric from 'numeric';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

var nodesS=[];
var nodesE=[];
var nodesT=[];
var edges=[];

function App() {
    const[table,setTable]=React.useState([['','','','','','','','','','']]);
    const[page,setPage]=React.useState(0);
    const[text, setText] = React.useState('');
    const[start, setStart] = React.useState('');
    const[end, setEnd] = React.useState('');
    const[cost, setCost] = React.useState('');
    const[type,setType]=React.useState('0');
    const[list,setList]=React.useState('');
    const[solution,setSolution]=React.useState('');
    const[nodeNumber,setNodeNumber]=React.useState(0);
    const[edgeNumber,setEdgeNumber]=React.useState(0);
    const[gain,setGain]=React.useState('');
    const handleChange = (event, value) => {
        setPage(value-1);
    };
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleStartChange = (event) => {
        setStart(event.target.value);
    };
    const handleEndChange = (event) => {
        setEnd(event.target.value);
    };
    const handleCostChange = (event) => {
        setCost(event.target.value);
    };
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
  return (
    <div className="App">
        <Typography variant='body1'>Zysk całkowity: {gain}</Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={()=>{zad1(setTable,setGain)}}
        >
            Zadanie1
        </Button>
        <Table>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{table[page][0]}</TableCell>
                <TableCell>{table[page][1]}</TableCell>
                <TableCell>{table[page][2]}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{table[page][3]}</TableCell>
                <TableCell>{table[page][4]}</TableCell>
                <TableCell>{table[page][5]}</TableCell>
                <TableCell>{table[page][6]}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>{table[page][7]}</TableCell>
                <TableCell>{table[page][8]}</TableCell>
                <TableCell>{table[page][9]}</TableCell>
                <TableCell>{table[page][10]}</TableCell>
            </TableRow>
        </Table>
        <Pagination count={table.length} page={page+1} onChange={handleChange}/>
        <Grid container>
            <Grid item>
                <TextField
                    size='small'
                    label="Popyt/podaż"
                    variant='outlined'
                    value={text}
                    onChange={handleTextChange}
                />
            </Grid>
            <Grid item>
                <RadioGroup value={type} onChange={handleTypeChange} row>
                    <FormControlLabel value='0' control={<Radio color='primary'/>} label="Początkowy" />
                    <FormControlLabel value='1' control={<Radio color='primary'/>} label="Końcowy" />
                    <FormControlLabel value='2' control={<Radio color='primary'/>} label="Tranzytowy" />
                </RadioGroup>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{setText('');setStart('');setEnd('');setCost('');addNode(Number(type),Number(text),nodesS,nodesE,nodesT,edges,nodeNumber,setNodeNumber,setList)}}
                >Dodaj węzeł</Button>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item>
                <TextField
                    size='small'
                    label="Początek"
                    variant='outlined'
                    value={start}
                    onChange={handleStartChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    label="Koniec"
                    variant='outlined'
                    value={end}
                    onChange={handleEndChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    label="Koszt"
                    variant='outlined'
                    value={cost}
                    onChange={handleCostChange}
                />
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>{setText('');setStart('');setEnd('');setCost('');addEdge(Number(start),Number(end),Number(cost),nodesS,nodesE,nodesT,edges,edgeNumber,setEdgeNumber,setList)}}
                >Dodaj krawędź</Button>
            </Grid>
        </Grid>
        <Button
            variant="contained"
            color="primary"
            onClick={()=>{clear(nodesS,nodesE,nodesT,edges,setNodeNumber,setEdgeNumber,setList)}}
        >Wyczyść</Button><br/>
        <Button
            variant="contained"
            color="primary"
            onClick={()=>{zad2(nodesS,nodesE,nodesT,edges,setSolution)}}
        >
            Start
        </Button><br/>
        {list}
    </div>
  );
}

export default App;

function addEdge(start,end,cost,nodesS,nodesE,nodesT,edges,edgeNumber,setEdgeNumber,setList){
    edges.push({ID:edgeNumber,start:start,end:end,cost:cost});
    setEdgeNumber(edges.length);
    var list=[]
    var i;
    if (nodesS.length>0){
        list.push(<Typography variant='body1'>Węzły początkowe:</Typography>);
        for(i=0;i<nodesS.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesS[i].ID}: {nodesS[i].limit}
                </Typography>
            );
    }
    if (nodesT.length>0){
        list.push(<Typography variant='body1'>Węzły tranzytowe:</Typography>);
        for(i=0;i<nodesT.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesT[i].ID}
                </Typography>
            );
    }
    if (nodesE.length>0){
        list.push(<Typography variant='body1'>Węzły końcowe:</Typography>);
        for(i=0;i<nodesE.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesE[i].ID}: {nodesE[i].limit}
                </Typography>
            );
    }
    if (edges.length>0){
        list.push(<Typography variant='body1'>Połączenia:</Typography>);
        for(i=0;i<edges.length;i++)
            list.push(
                <Typography variant='body1'>
                    {edges[i].ID}: {edges[i].start} - {edges[i].end} - {edges[i].cost}
                </Typography>
            );
    }
    setList(list);
}
function addNode(where,value,nodesS,nodesE,nodesT,edges,nodeNumber,setNodeNumber,setList){
    switch(where){
        case 0:
            nodesS.push({ID:nodeNumber,limit:value});
            break;
        case 1:
            nodesE.push({ID:nodeNumber,limit:value});
            break;
        case 2:
            nodesT.push({ID:nodeNumber});
            break;
        default:
    }
    var list=[]
    var i;
    if (nodesS.length>0){
        list.push(<Typography variant='body1'>Węzły początkowe:</Typography>);
        for(i=0;i<nodesS.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesS[i].ID}: {nodesS[i].limit}
                </Typography>
            );
    }
    if (nodesT.length>0){
        list.push(<Typography variant='body1'>Węzły tranzytowe:</Typography>);
        for(i=0;i<nodesT.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesT[i].ID}
                </Typography>
            );
    }
    if (nodesE.length>0){
        list.push(<Typography variant='body1'>Węzły końcowe:</Typography>);
        for(i=0;i<nodesE.length;i++)
            list.push(
                <Typography variant='body1'>
                    {nodesE[i].ID}: {nodesE[i].limit}
                </Typography>
            );
    }
    if (edges.length>0){
        list.push(<Typography variant='body1'>Połączenia:</Typography>);
        for(i=0;i<edges.length;i++)
            list.push(
                <Typography variant='body1'>
                    {edges[i].ID}: {edges[i].start} - {edges[i].end} - {edges[i].cost}
                </Typography>
            );
    }
    setNodeNumber(nodesS.length+nodesE.length+nodesT.length);
    setList(list)
}
function clear(nodesS,nodesE,nodesT,edges,setNodeNumber,setEdgeNumber,setList){
    nodesS.length=0;
    nodesE.length=0;
    nodesT.length=0;
    edges.length=0;
    setNodeNumber(0);
    setEdgeNumber(0);
    setList('');
}

function zad2(Ns,Ne,Nt,E,setSolution) {
    const SimpleSimplex = require('simple-simplex');
    var json={objective:{},constraints:[],optimizationType:'max'};
    var i,j;
    for(i=0;i<E.length;i++) {
        json.objective['x' + i.toString()] = 0 - E[i].cost;
        json.constraints.push({namedVector:{},constraint:'>=',constant:0});
        j=0
        for(j=0;j<E.length;j++)
            json.constraints[i].namedVector['x'+j.toString()]=0;
        json.constraints[i].namedVector['x'+i.toString()]=1;
    }
    for (i = 0; i < Ns.length; i++){
        json.constraints.push({namedVector:{},constraint:'<=',constant:Ns[i].limit});
        j=0;
        for (j = 0; j < E.length; j++){
            if (E[j].start === Ns[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=1;
            else if (E[j].end === Ns[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=-1;
            else
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=0;
        }
    }
    for (i = 0; i < Ne.length; i++){
        json.constraints.push({namedVector:{},constraint:'>=',constant:Ne[i].limit});
        j=0;
        for (j = 0; j < E.length; j++){
            if (E[j].start === Ne[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=-1;
            else if (E[j].end === Ne[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=1;
            else
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=0;
        }
    }
    for (i = 0; i < Nt.length; i++){
        json.constraints.push({namedVector:{},constraint:'<=',constant:0});
        j=0;
        for (j = 0; j < E.length; j++){
            if (E[j].start === Nt[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=1;
            else if (E[j].end === Nt[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=-1;
            else
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=0;
        }
        json.constraints.push({namedVector:{},constraint:'>=',constant:0});
        j=0;
        for (j = 0; j < E.length; j++){
            if (E[j].start === Nt[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=1;
            else if (E[j].end === Nt[i].ID)
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=-1;
            else
                json.constraints[json.constraints.length-1].namedVector['x'+j.toString()]=0;
        }
    }
    console.log(json);
    const solver= new SimpleSimplex(json);
    const result = solver.solve({
        methodName: 'simplex',
    });
    console.log(result)
    var solution=[];
    solution.push(<Typography variant='h1'>Wynik:{result.solution.optimum}</Typography>);
    solution.push(<Typography variant='body1'>{result.solution.coefficients}</Typography>);
    setSolution(solution);
}



//     var variables=[],i=0;
//     for (i = 0; i < E.length; i++)
//         variables.push(0-E[i].cost);
//     var constraints=[],constraintsR=[],equalities=[],equalitiesR=[],j=0;
//     for (i = 0; i < variables.length; i++){
//         j=0;
//         constraints.push([]);
//         for (j = 0; j < variables.length; j++){
//             constraints[i].push(0);
//         }
//         constraints[i][i]=-1;
//         constraintsR.push(0);
//     }
//     for (i = 0; i < Ns.length; i++) {
//         constraints.push([]);
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Ns[i].ID)
//                 constraints[constraints.length-1].push(1);
//             else if (E[j].end === Ns[i].ID)
//                 constraints[constraints.length-1].push(-1);
//             else
//                 constraints[constraints.length-1].push(0);
//         constraintsR.push(Ns[i].limit)
//     }
//     for (i = 0; i < Ne.length; i++) {
//         constraints.push([]);
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Ne[i].ID)
//                 constraints[constraints.length-1].push(1);
//             else if (E[j].end === Ne[i].ID)
//                 constraints[constraints.length-1].push(-1);
//             else
//                 constraints[constraints.length-1].push(0);
//         constraintsR.push(0-Ne[i].limit)
//     }
//     for (i = 0; i < Nt.length; i++) {
//         equalities.push([]);
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Nt[i].ID)
//                 equalities[equalities.length-1].push(1);
//             else if (E[j].end === Nt[i].ID)
//                 equalities[equalities.length-1].push(-1);
//             else
//                 equalities[equalities.length-1].push(0);
//         equalitiesR.push(0)
//         equalities.push([]);
//     }
//     var lp;
//     if (constraints.length===0) constraints=undefined;
//     if (constraintsR.length===0) constraintsR=undefined;
//     if (equalities.length===0) equalities=undefined;
//     if (equalitiesR.length===0) equalitiesR=undefined;
//
//     lp = numeric.solveLP(variables,constraints,constraintsR,equalities,equalitiesR,10000);
//     console.log(lp);
//     console.log(variables);
//     console.log(constraints);
//     console.log(constraintsR);
//     console.log(equalities);
//     console.log(equalitiesR);
// }

//     var lpsolve = require('lp_solve');
//     var Row = lpsolve.Row;
//     console.log(Row);
//     var objective = new Row();
//     var lp = new lpsolve.LinearProgram();
//     var variables = [];
//     var i;
//     for (i = 0; i < E.length; i++) {
//         variables.push(lp.addColumn('x' + i.toString(), true));
//         Row.Add(variables[i], E[i].cost);
//     }
//     lp.setObjective(objective);
//     var constraint, j = 0;
//     for (i = 0; i < Ns.length; i++) {
//         constraint = new Row();
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Ns[i].ID)
//                 constraint.Add(variables[j], 1)
//             else if (E[j].end === Ns[i].ID)
//                 constraint.Subtract(variables[j], 1)
//         lp.addConstraint(constraint, 'LE', Ns[i].limit, 'constraint' + Ns[i].ID.toString())
//     }
//     for (i = 0; i < Ne.length; i++) {
//         constraint = new Row();
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Ne[i].ID)
//                 constraint.Subtract(variables[j], 1)
//             else if (E[j].end === Ne[i].ID)
//                 constraint.Add(variables[j], 1)
//         lp.addConstraint(constraint, 'GE', Ne[i].limit, 'constraint' + Ne[i].ID.toString())
//     }
//     for (i = 0; i < Nt.length; i++) {
//         constraint = new Row();
//         j = 0;
//         for (j = 0; j < E.length; j++)
//             if (E[j].start === Nt[i].ID)
//                 constraint.Add(variables[j], 1)
//             else if (E[j].end === Nt[i].ID)
//                 constraint.Subtract(variables[j], 1)
//         lp.addConstraint(constraint, 'E', 0, 'constraint' + Nt[i].ID.toString())
//     }
//     console.log(lp.dumpProgram());
//     console.log(lp.solve());
//     console.log(lp);
//
// }





//     require('glpk.js').then(glpk => {
//             var i, j;
//             let json = {name: 'LP', objective: {direction: glpk.GLP_MIN, name: 'obj', vars: []}, subjectTo: [],};
//             for (i = 0; i < Ns.length; i++) {
//                 json.subjectTo.push({
//                     name: 'cons' + i.toString(),
//                     vars: [],
//                     bnds: {type: glpk.GLP_UP, ub: Ns[i].limit, lb: 0}
//                 });
//                 for (j = 0; j < E.length; j++)
//                     if (E[j].start === Ns[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: 1});
//                     else if (E[j].end === Ns[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: -1});
//             }
//             for (i = 0; i < Ne.length; i++) {
//                 json.subjectTo.push({name: 'cons' + i.toString(), vars: [], bnds: {type: glpk.GLP_UP, lb: Ne[i].limit}});
//                 for (j = 0; j < E.length; j++)
//                     if (E[j].start === Ne[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: -1});
//                     else if (E[j].end === Ne[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: 1});
//             }
//             for (i = 0; i < Nt.length; i++) {
//                 json.subjectTo.push({name: 'cons' + i.toString(), vars: [], bnds: {type: glpk.GLP_UP, ub: 0, lb: 0}});
//                 for (j = 0; j < E.length; j++)
//                     if (E[j].start === Nt[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: 1});
//                     else if (E[j].end === Nt[i].ID)
//                         json.subjectTo[json.subjectTo.length - 1].vars.push({name: 'x' + E[j].ID.toString(), coef: -1});
//             }
//             for (i = 0; i < E.length; i++)
//                 json.objective.vars.push({name: 'x' + E[i].ID.toString(), coef: E[i].cost});
//             console.log(json);
//             console.log(glpk.solve(json, glpk.GLP_MSG_ALL));
//         }
//     );
// }
