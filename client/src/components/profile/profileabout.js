import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Profileabout = ({
    profile: {
        bio,
        skills,
        user: { name }
    }
}) => {
    return (
        <div className="profile-about bg-light p-2">
            {
                bio && (
                    <Fragment>

                        <h2 className="text-primary">{name}</h2>
                        <p>
                            {bio}
                        </p>
                    </Fragment>
                )
            }
            <h2 className='text-primary'>Skill Set</h2>
            <div className='skills'>
                {
                    skills.map((skill, index) =>
                        <div key={index} className='p-1'>
                            <i className='fas fa-check' /> {skill}
                        </div>


                    )
                }
            </div>
        </div>
    )
};

Profileabout.propTypes = {

};

export default Profileabout;
