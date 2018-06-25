import React, { Component, Fragment } from 'react';
// import './container.css';
import  { Grid, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './container.css';
let matrix = [];
for(let i=3; i > 0; i--) {
    let row = [];
    for(let k=0;k<3;k++){
        row.push({i,k});
    } 
    matrix.push(row);
}

const operators = [
    {name: 'addition', sign: '+', display: '+', fn: (a,b) => a+b},
    {name: 'subtraction', sign: '-', display: '-', fn: (a,b) => a-b},
    {name: 'division', sign: '/', display: '%', fn: (a,b) => a/b},
    {name: 'equal', sign: '=', display: '=', fn: (a,b,f) => f(a,b)},
    //{name: 'multiplication', sign: '*', display: 'x', fn: (a,b) => a*b}
]
class Container extends Component {
    constructor(props){
        super(props);
        this.state = {mat:matrix, result:'0'};
        this.calc = this.calc.bind(this);
        this.onKey = this.onKey.bind(this);
        this.clear = this.clear.bind(this);

    }
    calc(sign){
        //return e=>{
            const {result:res} = this.state;

            let nums = res.split(/\+|\-|\%|\x/).map(a => parseInt(a));
            let ops = res.split(/[\d\.]+/).filter(a => a).map(o => operators.find(opr => opr.display === o));
            let x = ops[0].fn(nums[0],nums[1]);
            for(let i=1; i< nums.length -2 ;i++){
                x = ops[i].fn(nums[i+1]);
            }
            this.setState({result: parseFloat(x.toFixed(4))});
        //}
    }
    onKey(n){
        let self = this;
        return e => {
            const {result:res} = this.state;
            if('%+-'.includes(res[res.length-1]) && (typeof n !== 'number')) return;
            if(n === '='){
                self.calc();
            }else{
                let st = self.state.result;
                if(st === '0') st ='';
                self.setState({
                    result: (''+ st).concat(n)
                })
            }
            
        }
    }
    clear(e){
        this.setState({result: '0'});
    }
    render() {
        const mat = this.state.mat || [];
        const {result} = this.state;
        return (
        <Fragment>

        <div className='container calc'>

        <div className='col-xs-4 col-md-4'>

            <div className='row'>
            <div className='col-xs-12 col-md-12  result'>{result}</div>
                <div className='col-xs-9 col-md-9 nopadding'>
                    <div className='col-xs-12 col-md-12 clearbutton nopadding' onClick={this.clear}>Clear</div>
                    {
                        mat.map((row,r) => {
                            return (
                                <div key={r} className="col-xs-12 col-md-12 row nopadding">

                                    {
                                        row.map((col,i) => {   
                                            const n = r*3+i+1;             
                                            return (      
                                                <div key={i+'-'+r} className='col-xs-4 col-md-4 cell' onClick={this.onKey(n)}>
                                                {n}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
                <div className='col-xs-3 col-md-3 nopadding'>
                <ul className='col-md-12 col-xs-12 nopadding'>
                {
                    operators.map((op, oi) => {
                        return (
                            <li className='operator'>
                            <button key={'op' + oi} onClick={this.onKey(op.display)}>{op.display}</button>
                            </li>
                        )
                    })
                }
                </ul>
                </div>
            </div>
            </div>
            </div>
            </Fragment>
        );
    }
}

export default Container;