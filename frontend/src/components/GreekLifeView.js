import GreekLifeItem from './GreekLife'

function GreekLifeView(props) {
  return (
    <div>
      <ul>
        {props.greekLifeList.map(GreekLife => <GreekLifeItem GreekLife={GreekLife} />)}
      </ul>
    </div>
  )
}

export default GreekLifeView