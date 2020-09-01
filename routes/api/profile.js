const express = require('express');
const router = express.Router();
const Profile = require('../../models/profile');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/post');

//@route   get api/profile
//@desc    test route
//@access  public


router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/',
  [auth,
    [check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Status is required').not().isEmpty(),
    ]
  ]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    const { skills } = req.body;
    if (skills) {
      profileFields.skills = Array.isArray(skills) ? skills : skills.split(',').map((skill) => ' ' + skill.trim());

    }
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    //console.log(profileFields);
    Profile.findOne({ user: req.user.id }).then(profile => {

      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      }
      else {
        // Create

        // Check if handle exists


        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));

      }
    });

  })

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})





router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user ' })

    res.json(profile);

  } catch (error) {
    console.error(error.message);
    if (error.kind == 'objectId') {
      return res.status(400).json({ msg: 'Profiles not found' })
    }
    res.status(500).send('Server Error');
  }
})

router.put('/experience', [auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
  ]
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }


  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }

})

router.delete('/', auth, async (req, res) => {
  try {

    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})



router.put('/education', [auth,
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
  ]
], async (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }

})

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);;

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})



module.exports = router;