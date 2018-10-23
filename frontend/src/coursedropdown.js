import React from 'react'

class CourseDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        //getting options for course dropdowm menu
        fetch(document.location.protocol + '//' + document.location.hostname + ':8000' + '/api/courses/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        }).then(response => response.json()).then(data => this.setState({ options: data }))
    }
    render() {
        return (
            <div>
                <select id='course'>
                    {this.state.options.map(option => (
                        <option key={option.id} apikey={option.id}>{option.student.first_name}'s {option.name} course </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default CourseDropdown