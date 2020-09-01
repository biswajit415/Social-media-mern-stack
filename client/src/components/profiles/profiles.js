import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfile } from '../actions/profile';
import Spinner from '../layout/spinner'
import ProfileItem from './profileItem';

const Profiles = ({ profile, profile: { profiles, loading }, getAllProfile }) => {

    const [load, setLoad] = useState(true)

    useEffect(() => {
        getAllProfile().then(() => {
            setLoad(false);
        })
    }, [getAllProfile]);

    console.log(load);

    return (
        <Fragment>

            {load ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelope"></i>
                    Browse and connect with the developers
              </p>
                    <div className="profiles">
                        {profile.profiles.length > 0 ? (
                            profile.profiles.map(profile => {
                                console.log(profile);
                                return <ProfileItem key={profile._id} profile={profile} />
                            })
                        ) :
                            <h4>No profiles found.
                   ..</h4>
                        }
                    </div>

                </Fragment>

            }
        </Fragment>


    )
};

ProfileItem.propTypes = {

    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps, { getAllProfile })(Profiles);
