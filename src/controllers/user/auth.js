const User   = require("@models/user");
const logger = require('@common/winston');
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { ReasonPhrases, StatusCodes } = require('http-status-codes')

/**
 * Hash password to save in DB
 *
 * @param {string} password
 * 
 * @returns {string} String
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Creates an instance of User
 *
 * @param {*} req
 * @param {*} res
 * 
 * @returns {User}
 */
exports.sign_up = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    var user = await User.findOne({
      email: email
    })

    if (user != null) {
      return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({
        success: false,
        message: "An account already exists using this email.",
        error: ReasonPhrases.UNPROCESSABLE_ENTITY
      });
    }

    var hashedPwd = await hashPassword(password)

    newUser = new User({
      name,
      email,
      password: hashedPwd
    })

    await newUser.save();
    
    return res
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: newUser,
      message: ReasonPhrases.OK
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `Error when registering. Err: ${error.toString()}.`
    });
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error
    });
  }
}

/**
 * Make a login attempt
 *
 * @param {*} req
 * @param {*} res
 * 
 * @returns {User}
 */
exports.sign_in = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    var user = await User.findOne({
      email: email
    })
    
    if (user != null) {
      const validPwd = await validatePassword(password, user.password);
      if(validPwd) {
        const id = user._id;
        var token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 86400 * 7,
        });

        user.access_token = token;
        await User.findByIdAndUpdate(user._id, { accessToken: token });

        return res
        .status(StatusCodes.OK)
        .json({
            success: true,
            message: StatusCodes.OK,
            data: {
              id: user.id,
              name: user.name,
              access_token: user.accessToken,
              photo: user.photo ?? null,
            },
        });
      }
    }
    return res
    .status(StatusCodes.BAD_REQUEST)
    .json({
      success: false,
      message: 'Invalid email or password!'
    });
  } catch (error) {
    logger.log({
      level: 'error',
      message: `Error logging in. Err: ${error.toString()}.`
    });
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: error
    });
  }
}