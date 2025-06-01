import User from "../UserModule/UserModel.js";
import Agency from "../AgencyModule/AgencyModel.js";
import Email from "../EmailModule/EmailModel.js";
import Intervention from "../InterventionModule/InterventionModel.js";
import Section from "../SectionModule/SectionModule.js";

// Agency ⟷ Users
Agency.hasMany(User, {
    foreignKey: 'agency_id',
    onDelete: 'CASCADE',
    // hooks: true
});
User.belongsTo(Agency, {
    foreignKey: 'agency_id',
    onDelete: 'CASCADE',
    // hooks: true
});

// User ⟷ Emails envoyés (source_user_id)
User.hasMany(Email, {
    foreignKey: 'source_user_id',
    as: 'sentEmails',
    onDelete: 'CASCADE',
    // hooks: true
});
Email.belongsTo(User, {
    foreignKey: 'source_user_id',
    as: 'sender',
    onDelete: 'CASCADE',
    // hooks: true
});

// User ⟷ Emails reçus (destination_user_id)
User.hasMany(Email, {
    foreignKey: 'destination_user_id',
    as: 'receivedEmails',
    onDelete: 'CASCADE',
    hooks: true
});
Email.belongsTo(User, {
    foreignKey: 'destination_user_id',
    as: 'receiver',
    onDelete: 'CASCADE',
    // hooks: true
});

// Section ⟷ Intervention
Section.hasMany(Intervention, {
    foreignKey: 'section_id',
    onDelete: 'CASCADE',
    // hooks: true
});
Intervention.belongsTo(Section, {
    foreignKey: 'section_id',
    onDelete: 'CASCADE',
    // hooks: true
});

// User ⟷ Intervention
User.hasMany(Intervention, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    // hooks: true
});
Intervention.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    // hooks: true
});

export default {
    User,
    Agency,
    Email,
    Intervention,
    Section,
};
