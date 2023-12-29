// storyMiddleware.js
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require("../../../Backend/Helpers/error/CustomError");
const StoryModel = require("../../../Backend/Models/story");

const checkStoryExist = asyncErrorWrapper(async (req, res, next) => {
    const { slug } = req.params;
    const story = await StoryModel.findOne({
        slug: slug,
    });

    if (!story) {
        return next(new CustomError("There is no such story with that slug", 400));
    }

    next();
});

const checkUserAndStoryExist = asyncErrorWrapper(async (req, res, next) => {
    const { slug } = req.params;

    const story = await StoryModel.findOne({
        slug: slug,
        author: req.user,
    });

    if (!story) {
        return next(new CustomError("There is no story with that slug associated with User", 400));
    }

    next();
});

module.exports = {
    checkStoryExist,
    checkUserAndStoryExist,
};
