import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../actions/profile';
import profile from '../../reducer/profile';
import Spinner from '../layout/spinner';
import DashboardActions from './dashboardAction';
import Experience from './experience';
import Education from './education';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
    const [load, setLoad] = useState(true);
    useEffect(() => {

        getCurrentProfile().then(() => {

            setLoad(false);
        })



    }, [])


    return (
        <Fragment>
            {load ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome {user && user.name}
                    </p>
                    {
                        profile != null ? (
                            <Fragment>
                                <DashboardActions />
                                <Education education={profile.education} />
                                <Experience experience={profile.experience} />

                                <div className="my-2">
                                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                        <i className="fas fa-user-minus"></i>
                               Delete My Account
                              </button>
                                </div>

                            </Fragment>
                        ) : (
                                <Fragment>
                                    <p>You have not yet profile</p>
                                    <Link to='/create-profile' className='btn btn-primary my-1'>
                                        Create Profile
                        </Link>

                                </Fragment>
                            )
                    }

                </Fragment>
            };
        </Fragment>)
}


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile,
    }
}
export default connect(mapStateToProps, {
    getCurrentProfile,
    deleteAccount,
})(Dashboard); 