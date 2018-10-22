import React, { Component, Fragment } from 'react'
import { data } from '../dataDummy'

export default class CardQuestion extends Component {

  constructor(props) {
    super(props)
    this.correctAnswer = this.correctAnswer.bind(this)
    this.wrongAnswer = this.wrongAnswer.bind(this)
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  state = {
    index: 0,
    complete: false,
    answer: null,
    score: 0
  }

  nextQuestion() {
    const length = data.length
    const { index } = this.state
    console.log('index =>', index)
    if (index === length - 1) {
      console.log('masuk if complete')
      this.setState({
        complete: true
      })
    } else {
      this.setState({
        index: this.state.index + 1,
        answer: null
      })
    }
  }

  correctAnswer() {
    this.setState({
      answer: true,
      score: this.state.score + 1
    })
  }

  wrongAnswer() {
    this.setState({
      answer: false
    })
  }

  render () {
    const length = data.length
    const { index, answer, complete } = this.state
    const currentQuestion = data[index]
    
    return (
      <Fragment>
        <div style={{textAlign: 'center', marginTop: 10}}>
          <h3>React Redux Quiz</h3><hr/>
          <p>Question {this.state.index + 1} of {length}</p>
          <p>{currentQuestion.soal}</p>
        </div>
        {
          currentQuestion.jawaban.map((select, j) => {
            if (this.state.answer === null) {
              if (select.answer === 'true') {
                return (
                  <div className="card" style={{marginBottom: 5}} key={j} onClick={this.correctAnswer}>
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="card" style={{marginBottom: 5}} key={j} onClick={this.wrongAnswer}>
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              }
            }
            
            if (this.state.answer) {
              if (select.answer === 'true') {
                return (
                  <div className="card bg-success" style={{marginBottom: 5, color:"#FFF"}} key={j} id="correctAnswer">
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              } else if (select.answer === 'false') {
                return (
                  <div className="card" style={{marginBottom: 5}} key={j} id="wrongAnswer">
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              }
            } else {
              if (select.answer === 'false') {
                return (
                  <div className="card bg-danger" style={{marginBottom: 5, color:"#FFF"}} key={j} id="wrongAnswer">
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="card bg-success" style={{marginBottom: 5, color:"#FFF"}} key={j} id="wrongAnswer">
                    <div className="card-body">
                      <p>{ select.select }</p>
                    </div>
                  </div>
                )
              }
            }
          })
        }
        {
          answer !== null && 
          <div style={{textAlign: 'center', marginBottom: 20, marginTop: 15}}>
          {
            answer ? <h3>Nice 🎉</h3> : <h3>❌ Oops!</h3>
          }
          {
            index + 1 === length ? 
            <button className="btn btn-primary" onClick={this.nextQuestion}>Submit</button> :
            <button onClick={this.nextQuestion} className="btn btn-primary" style={{borderRadius: 50}}>Selanjutnya</button>
          }
          {
            complete && alert('Selesai' + this.state.score)
          }
          </div>
        }
        
      </Fragment>
    )
  }
}