let express = require('express');

const mongoose = require('mongoose');

const codeGenerator = require(".././codegeneration/codegenerator");

const Template = require(".././models/template");

let router = express.Router();

const successResponse = createResponse("Success");
function createResponse(message) {
	return {"message": message};
}

let templatesPath = "/templates";

// Get templates. Optionally filter by technology.
router.get(templatesPath, function (req, res) {
    let technologyName = req.query.technology;
    
    let criteria = {creator: req.user};
    
    if (technologyName) {
        criteria["technology"] = technologyName;
    }
    
    Template.find(criteria, function (err, templates) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }
        
        return res.status(200).json(templates);
    });
});

// Get template by id.
router.get(templatesPath + "/:id", function (req, res) {
    let id = req.params.id;
    
    Template.findOne({_id: id}, function (err, template) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }
        
        if (template.creator !== req.user) {
            return res.status(403).json(createResponse("Not Allowed"));
        }
        
        return res.status(200).json(template);
    });
});

// Get generated code based on template.
router.get(templatesPath + "/:id/generate", function (req, res) {
    let id = req.params.id;
    let parameters = req.body.parameters;
    
    Template.findOne({_id: id}, function (err, template) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }
        
        if (template.creator !== req.user) {
            return res.status(403).json(createResponse("Not Allowed"));
        }
        
        let generatedCode = codeGenerator.generateCode(template, parameters);
    
        return res.status(200).json(generatedCode);
    });
});

// Get technologies of templates.
router.get("/technologies", function (req, res) {
    Template.find({creator: req.user}, "technology", function (err, technologies) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }

        let technologyNames = [];
        for (let i = 0; i < technologies.length; i++) {
            technologyNames.push(technologies[i].technology);
        }
        
        return res.status(200).json(technologyNames);
    });
});

// Create template.
router.post(templatesPath, function (req, res) {
    let template = new Template({
        creator: req.user,
        technology: req.body.technology,
        name: req.body.name,
        code: req.body.code,
        parameters: req.body.parameters
    });
    
    if (!template.technology) {
        return res.status(400).json(createResponse("Invalid technology"));
    } else if (!template.name)  {
        return res.status(400).json(createResponse("Invalid name"));
    } else if (template.code === undefined)  {
        return res.status(400).json(createResponse("Invalid code"));
    }
    
    template.save(function (err) {
        if (err) {
            return res.status(409).json(createResponse("Failed to create template: " + err));
        }
        
        return res.status(200).json(successResponse);
    });
});

// Edit template.
router.post(templatesPath + "/:id", function (req, res) {
    let id = req.params.id;
    
    Template.findById(id, function (err, template) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }
        
        if (template.creator !== req.user) {
            return res.status(403).json(createResponse("Not Allowed"));
        }
        
        template.set({
            creator: req.user,
            technology: req.body.technology,
            name: req.body.name,
            code: req.body.code,
            parameters: req.body.parameters
        });
        
        template.save(function (err) {
            if (err) {
                return res.status(409).json(
                    createResponse("Failed to edit template: " + err)
                );
            }
            
            return res.status(200).json(successResponse);
        });
    });
});

// Delete template.
router.delete(templatesPath + "/:id", function (req, res) {
    let id = req.params.id;
    
    Template.findById(id, function (err, template) {
        if (err) {
            return res.status(404).json(createResponse("Not Found"));
        }
        
        if (template.creator !== req.user) {
            return res.status(403).json(createResponse("Not Allowed"));
        }
        
        Template.deleteOne({_id: id}, function (err) {
            if (err) {
                return res.status(409).json(
                    createResponse("Failed to delete template: " + err)
                );
            }
            
            return res.status(200).json(successResponse);
        });
    });
});

module.exports = router;