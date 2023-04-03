import ClubsItem from './Clubs'

function ClubsView(){

  return (
    <div>
      <ul>
        {props.clubList.map(Clubs => <ClubsItem Clubs={Clubs} />)}
      </ul>
    </div>
  );
}

export default ClubsView
