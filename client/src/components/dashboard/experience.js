import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

    const exp = experience.map(exp => {
        return <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm' >{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment>-{' '}

                {exp.to === null ? ("Now") :
                    (<Moment format="YYYY/MM/DD">
                        {exp.to}
                    </Moment>)
                }
            </td>
            <td>
                <button
                    onClick={() => deleteExperience(exp._id)}
                    className="btn btn-danger"
                ><i className="fa fa-trash" aria-hidden="true" ></i></button>
            </td>

        </tr>

    })


    return (
        <Fragment>
            <h2 className="my-2"> Experience Credentials</h2>
            <table className="table" >

                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th>Years</th>
                    <th>Delete</th>
                </tr>



                {exp}


            </table>


        </Fragment>
    )
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
