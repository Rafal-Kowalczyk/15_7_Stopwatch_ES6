const destination = document.querySelector('#root');

const ENCIRCLEMENT_TIME_DISPLAY_INTERVAL = 300;



class Counter extends React.Component {
    render() {
        return <div id={'stopwatch'}>{this.props.value}</div>
    }
}

class Button extends React.Component {
    render() {
        return (<a href='#' id='button' id={this.props.id} onMouseDown={this.props.onClick}>{this.props.name}</a>)
    }
}

class ResultList extends React.Component {
    render() {   
        return (
        <div id='resultList'>
            <ol reversed={'reversed'} id={'results'}>{this.props.value}</ol>
            <Button id={'clear'} onClick={this.props.onButtonClick} name={'Clear list'} />
        </div>
        )
    }
}
// klasa Stopwatch
class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            encirclementTimes: []
        }
        this.printTime = this.format(this.state.times);
        this.buttonStopName = 'Stop';
    }

    render() {
        return (
            <div>
                <div id={'app'}>
                    <Counter value={this.printTime} />
                    <nav id={'controls'}>
                        <Button id={'start'} onClick={this.start} name={'Start'}/>
                        <Button id={'encirclement'} onClick={this.encirclement} name={'Encirclement'}/>
                        <Button id={'stop'} onClick={this.stop} name={this.buttonStopName}/>
 
                    </nav>
                    
                </div>
                <ResultList value={this.printEncirclementTimes()} onButtonClick={this.clear} />
            </div>
        )
    }

// metoda reset 
    reset = () => {
        const timesTemp = this.state.times;
        timesTemp.minutes = timesTemp.seconds = timesTemp.miliseconds = 0;
        this.setState({times: timesTemp});
    }

// metoda print    
    printEncirclementTimes = () => {
        const items = this.state.encirclementTimes.map( (item, id) => {
            
            return (
                <li key={id}>{item}</li>
            );
        });
        return items;
    }

    print = (times = this.state.times) => {
        this.printTime = this.format(times) 
        
    }

// metoda format - przygotowywuje tekst do wyświetlenia 
    format = (times) => {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

// implementacja funkcji start
    start = () => {
        if(!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => {
                this.step();      
            }, 10);
            this.displayTime = setInterval(() => this.print(),10);
            this.buttonStopName = 'Stop';
        }
    }

// metoda step - sprawdza czy timer jest uruchomiony
    step = () => {
        if(!this.state.running) return;
        this.calculate();
    }

// metoda calculate - przelicza min, sek i milisek
    calculate = () => {
        const timesTemp = this.state.times;

        timesTemp.miliseconds += 1;
        if( timesTemp.miliseconds >= 100) {
            timesTemp.seconds += 1;
            timesTemp.miliseconds = 0;
        }
        if(timesTemp.seconds >= 60) {
            timesTemp.minutes += 1;
            timesTemp.seconds = 0;    
        }
        this.setState({times: timesTemp})
    }

// metoda stop - zatrzymanie timera
    stop = () => {
        //stop stopwatch
        if(this.state.running) {
            this.setState({running: false});
            clearInterval(this.watch);
            clearInterval(this.displayTime);
            this.buttonStopName = 'Reset';

// zatrzymanie stopera i kliknięcie resetuje stoper	  
        } else {
            this.reset();
            this.print();
            this.buttonStopName = 'Stop';            
        }        
    }

// dodanie czasu okrążenia
    encirclement = () => {
        if(this.state.running) {
            const currentEncirclementTime = this.state.times;

            this.setState({
                encirclementTimes: [this.format(currentEncirclementTime), ...this.state.encirclementTimes]
            });
            clearInterval(this.displayTime);
            clearTimeout(this.timeoutEncirclementTime);

// wyświetlenie czasu okrążenia 
            this.print(currentEncirclementTime);
            this.timeoutEncirclementTime = setTimeout(() => {  
                this.displayTime = setInterval(() => this.print(),10);
                
            }, ENCIRCLEMENT_TIME_DISPLAY_INTERVAL);           
        }
//        else return;
    }

// czyszczenie listy wyników
    clear = () => {
        this.setState({
            encirclementTimes: []
        });
    }
}

ReactDOM.render(
    <Stopwatch/>
    , destination);

// implementacja funkcji pad0 - dodającej zero do liczbjednocyfrowych
function pad0(value) {
    let result = value.toString();
    if(result.length < 2) {
        return '0' + result;
    }
    return result;
}