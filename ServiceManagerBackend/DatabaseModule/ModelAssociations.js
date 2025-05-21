import User from "../UserModule/UserModel.js";       // Import the User model
import Agency from "../AgencyModule/AgencyModel.js"; // Import the Agency model
import Email from "../EmailModule/EmailModel.js";   // Import the Email model
import Intervention  from "../InterventionModule/InterventionModel.js"; // Import Intervention and Section
import Section  from "../SectionModule/SectionModule.js"; // Import Intervention and Section


// Define the association between Agency and User
Agency.hasMany(User, { foreignKey: 'agency_id' });
User.belongsTo(Agency, { foreignKey: 'agency_id' });


// Define the association between User and Email
Email.belongsTo(User,
    {
        foreignKey: 'source_user_id',
        as: 'sender'
    }
);

Email.belongsTo(User,
    {
        foreignKey: 'destination_user_id',
        as: 'receiver'
    }
);

// Define the association between Intervention and Section
Section.hasMany(Intervention, { foreignKey: 'section_id' });
Intervention.belongsTo(Section, { foreignKey: 'section_id' });

// Define the association between User and Intervention
User.hasMany(Intervention, { foreignKey: 'user_id' });
Intervention.belongsTo(User, { foreignKey: 'user_id' });

// All models that will be used
export default {
    User,
    Agency,
    Email,
    Intervention,
    Section,
};
