import React from 'react'
import Day from './day.js'


class MainStripe extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            week : [
                //one array for each day of week
                [], [], [], [], [], [], []
            ]
        }  
    }
    
    componentDidMount(){
        // geting an array of all lessons for this week  
        fetch(document.location.hostname + ':8000' + '/api/main', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(response => response.json()).
        then(data => {
            let tempArray = [
                [], [], [], [], [], [], []
            ]
            data.forEach(lesson => {
                lesson.datetime = new Date(lesson.datetime) //parsing datetime string into js Date object
                // putting each lesson in its dedicated array
                switch(lesson.datetime.getDay()){
                    case 1:
                        tempArray[0].push(lesson)
                        break
                    case 2:
                        tempArray[1].push(lesson)
                        break
                    case 3:
                        tempArray[2].push(lesson)
                        break
                    case 4:
                        tempArray[3].push(lesson)
                        break
                    case 5:
                        tempArray[4].push(lesson)
                        break
                    case 6:
                        tempArray[5].push(lesson)
                        break
                    case 0:
                        tempArray[6].push(lesson)
                        break
                }
            });
            this.setState({
                week: tempArray
                })
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className='stripe'>
                {this.state.week.map((day, index) => <Day key={index} day={index} lessons={day}/>)}
            </div>
        )
    }
}




export default MainStripe;