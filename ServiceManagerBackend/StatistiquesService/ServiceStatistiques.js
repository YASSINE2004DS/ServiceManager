import Models                                    from '../DatabaseModule/ModelAssociations.js';

const {User , Agency , Intervention, Section  } = Models ;

//class for service statistique
class StatistiquesService {

    async   getStats(req , res) {
    const usersCount                 = await User.count();
    const agenciesCount              = await Agency.count();
    const interventionsCount         = await Intervention.count();
    const sectionsCount              = await Section.count();
    const sectionRealiseesCount      = await Intervention.count({ where: { status: true } });
    const sectionNonRealiseesCount   = await Intervention.count({ where: { status: false } });
  
    return  res.status(200).json({
        users: usersCount,
        agencies: agenciesCount,
        interventions: interventionsCount,
        sections: sectionsCount ,
        sectionRealisees: sectionRealiseesCount,
        sectionNonRealisees: sectionNonRealiseesCount
    });
}

}

export default new StatistiquesService();