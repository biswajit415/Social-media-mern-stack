import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../actions/profile';

const Education = ({ education, deleteEducation }) => {

    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(edu.from)}</Moment> -{' '}
                {edu.to === null ? (
                    ' Now'
                ) : (
                        <Moment format="YYYY/MM/DD">{moment.utc(edu.to)}</Moment>
                    )}
            </td>
            <td>
                <button
                    onClick={() => deleteEducation(edu._id)}
                    className="btn btn-danger"
                >
                    Delete
            </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">

                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th>Actions</th>
                </tr>

                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
