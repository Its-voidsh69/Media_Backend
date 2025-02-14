const Content = require('../models/content');
const { NotFoundError } = require('../utils/errors');

async function getAllContent() {
    try {
        return await Content.find();
    } catch (error) {
        console.error("Error retrieving content:", error);
        return [];
    }
}

async function getContentByType(contentType) {
    try {
        return await Content.find({ contentType: contentType });
    } catch (error) {
        console.error(`Error retrieving ${contentType} content:`, error);
        return [];
    }
}

async function getContentByTypeAndFilters(contentType, category, duration, tags) {
    try {
        let query = { contentType: contentType };

        if (category) {
            query.category = category;
        }

        if (duration) {
            query.duration = { $lte: duration };
        }

        if (tags) {
            query.tags = { $in: tags };
        }

        const content = await Content.find(query);
        return content;
    } catch (error) {
        console.error(`Error retrieving and filtering ${contentType} content:`, error);
        return [];
    }
}

async function getContentById(contentId) {
    try {
        const content = await Content.findById(contentId);
        if (!content) {
            throw new NotFoundError(`Content with id ${contentId} not found`);
        }
        return content;
    } catch (error) {
        console.error("Error getting content by ID:", error);
        throw error;
    }
}

async function filterContent(category, duration, tags) {
    try {
        const query = {};

        if (category) {
            query.category = category;
        }

        if (duration) {
            query.duration = { $lte: duration };
        }

        if (tags) {
            query.tags = { $in: tags };
        }

        const content = await Content.find(query);
        return content;
    } catch (error) {
        console.error("Error filtering content:", error);
        throw error;
    }
}

module.exports = {
    getAllContent,
    getContentByType,
    getContentByTypeAndFilters,
    getContentById,
    filterContent
};