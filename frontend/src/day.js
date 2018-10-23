import React from 'react'

let dayOfWeek = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
}


class Day extends React.Component {
    constructor(props) {
        super(props)
    };
    

    render() {
        this.props.lessons.sort((a, b) => a.datetime - b.datetime)
        return (
            <div className='day'>
                <div className='day-upper'>{dayOfWeek[this.props.day]}</div>
                <div className='day-lower'>
                    {this.props.lessons[0] ? this.props.lessons.map((lesson, index) => 
                        <Lesson key={index} lesson={lesson} />) : ( <div className='lesson-none'>―</div>)}
                </div>
            </div>
        )
    }
}

export default Day

class Lesson extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='lesson card-box'>
                <div className='lesson-main'>{
                    this.props.lesson.course.student.first_name} <br/>
                    {this.props.lesson.course.name}
                </div>
                <div className='lesson-time'>
                    {this.props.lesson.datetime.getHours()}:{this.props.lesson.datetime.getMinutes()
                        ? this.props.lesson.datetime.getMinutes() : '00'}

                </div>
            </div>
        )
    }
}