import _ from 'lodash';

const canDonateToType = {
  O: ['O', 'A', 'B', 'AB'],
  A: ['A', 'AB'],
  B: ['B', 'AB'],
  AB: ['AB'],
};

export function canDonate(bloodType){
  const type = bloodType.slice(0, -1),
        factor = bloodType.slice(-1);

  switch(factor){
  case '+':
    return _.map(canDonateToType[type],(t)=>t+"+");
  case '-':
    {
      let types = canDonateToType[type];
      return _.chain(types)
        .map((t)=>[t+"+", t+"-"])
        .flatten()
        .value();
    }
  }
};
