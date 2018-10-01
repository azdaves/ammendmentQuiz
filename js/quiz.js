function questions(){
  return [
    {
      country: '(persons)',
      capital: ['Clothing you are wearing?', 'The backpack you are carrying?', 'The article you are holding for someone else?', 'All of these'],
      answer: 4
    },
    {
      country: '(houses)',
      capital: ['A camper trailer you are driving in?', 'The apartment you are renting', 'The car you are living in?', 'B & C only'],
      answer: 4
    },
    {
      country: '(papers)',
      capital: ['your iPhone?', 'your notebook?', 'your homework?', 'all of these'],
      answer: 4
    },
    {
      country: 'effects',
      capital: ['your hygiene items?', 'your medication?', 'your backpack?', 'all of these'],
      answer: 4
    },
    
  ]
}
function Question(props){
  return(
    <div className="qd">
      <h2 className="tc">In the 4th Amendment does _____ mean? <span>{props.text}</span>?</h2>
    </div>
  )
}
function Options(props){
    return(   
      <table className="optionsT">
        <tbody>
          {props.data.map((answer, index) =>
            <Answer key={index} id={index} text={answer} clickHandler={props.clickHandler} completed={props.completed}/>
          )}
        </tbody>
      </table>
    )
}
function Answer(props){
    return(
        <tr>
          <td onClick={()=> props.clickHandler(props.id)} disabled={props.completed}>
            {props.text}
          </td>
        </tr>
    )
}
function Score(props) {
  return(
    <table className="scoreT">
      <tbody>
        <tr>
          <th>Correct</th>
          <th>Incorrect</th>
        </tr>
        <tr>
          <td>{props.correct}</td>
          <td>{props.incorrect}</td>
        </tr>
      </tbody>
    </table>
  )
}

class Game extends React.Component{
  constructor(props){
    super(props);
    
    this.state = {
      questions: questions(),
      current: 0,
      correct: 0,
      incorrect: 0,
      completed: false
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  clickHandler(selected){
    var current = this.state.current;
    var correct = this.state.correct;
    var incorrect = this.state.incorrect;
    var completed = this.state.completed;
    
    if(!completed) {
       if(this.correctChoice(selected)){
         correct++;
       } else {
         incorrect++;
       }
      
      if(this.moreChoices()){
        current++;
      } else {
        completed = true;
      }
    }
    
    this.setState({
      current: current,
      correct: correct,
      incorrect: incorrect,
      completed: completed 
    });
  }
  
  correctChoice(selected){
    let current = this.state.current;
    let currentQuestion = this.state.questions[current];
    return selected + 1 === currentQuestion.answer;
  }
  
  moreChoices(){
    return this.state.current < this.state.questions.length - 1;
  }
  
  render(){
    let questions = this.state.questions;
    let current = Math.min(questions.length-1, this.state.current);
    let completed = this.state.completed;
      
    return(
      <div>
        <Question id={current + 1} text={questions[current].country}/>
        <Options data={questions[current].capital} clickHandler={this.clickHandler} completed={completed} />
        <Score correct={this.state.correct} incorrect={this.state.incorrect}/>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('main'));