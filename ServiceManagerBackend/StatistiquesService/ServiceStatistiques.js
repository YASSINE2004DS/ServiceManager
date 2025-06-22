import Models                                    from '../DatabaseModule/ModelAssociations.js';

const {User , Agency , Intervention, Section  } = Models ;

//class for service statistique
class StatistiquesService {

    async   getStats(req , res) {
    const usersCount                 = await User.count();
    const agenciesCount              = await Agency.count();
    const interventionsCount         = await Intervention.count();
    const sectionsCount              = await Section.count();
    const interventionRealiseesCount      = await Intervention.count({ where: { status: true } });
    const interventionNonRealiseesCount   = await Intervention.count({ where: { status: false } });
  
    return  res.status(200).json({
        users: usersCount,
        agencies: agenciesCount,
        interventions: interventionsCount,
        sections: sectionsCount ,
        interventionRealisees: interventionRealiseesCount,
        interventionNonRealisees: interventionNonRealiseesCount
    });
}

}

export default new StatistiquesService();