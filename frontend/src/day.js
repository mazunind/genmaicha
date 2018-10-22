import React from 'react'




class Day extends React.Component {
    constructor(props) {
        super(props)
    };
    //function for displaying proper weekday above day component
    dayOfWeek(index){
        switch(index){
            case 0:
                return 'Monday'
                break
            case 1:
                return 'Tuesday'
                break
            case 2:
                return 'Wednesday'
                break
            case 3:
                return 'Thursday'
                break
            case 4:
                return 'Friday'
                break
            case 5:
                return 'Saturday'
                break
            case 6:
                return 'Sunday'
                break
        }
    }
    

    render() {
        this.props.lessons.sort((a, b) => a.datetime - b.datetime)
        return (
            <div className='day'>
                <div className='day-upper'>{this.dayOfWeek(this.props.day)}</div>
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