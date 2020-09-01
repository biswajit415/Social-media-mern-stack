import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getProfileById } from '../actions/profile';
import ProfileTop from './profileTop';
import Profileabout from './profileabout';
import ProfileExperience from './profileExperience';
import ProfileEducation from './profileEducation';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match,
}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
                (<Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to profiles
               </Link>

                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <Profileabout profile={profile} />
                        <div className='profile-exp bg-white p-2' >
                            <h2 className='text-primary'>Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    )))}
                                </Fragment>
                            ) : (

                                    <h4>No Experience Found</h4>

                                )

                            }
                        </div>


                        <div className='profile-edu bg-white p-2' >
                            <h2 className='text-primary'>Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    )))}
                                </Fragment>
                            ) : (

                                    <h4>No Education Found</h4>

                                )

                            }
                        </div>


                    </div>


                </Fragment>)

            }
        </Fragment>
    )
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateProps = state => {
    return {
        profile: state.profile,
        auth: state.auth,
    }
}

export default connect(mapStateProps, { getProfileById })(Profile);
