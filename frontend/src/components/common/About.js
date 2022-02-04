import React from 'react'

class About extends React.Component {
  state = {
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="about-page change-brightness">
        <div className="form-wrapper">
          <h1>NU Hippies Movement</h1>
          <p>
              We are Nu Hippies Movement and we believe that the world need Hippie kind of spirit right now more than ever. 
              There is a lot of conflicts and environmental problems. Predictions for a future doesn’t look good.
              It’s a pretty pessimistic times right now as we don’t have a solutions or maybe we do 
              but we don’t have a will to solve a big environmental problems. Young people doesn’t have that idealistic way of thinking
              as young people of 60’s and 70’s. Kids are raised with a dreams of being successful in terms of money and career but there is no idealism in them anymore, no activism, no ambition to do something for a greater good. Of course there are still people like that, 
              but its a very small percentage comparing to Hippie times. 
              How is our movement different from original Hippies? 
              We are trying to combine Hippie Idealism with rational arguments. 
              What do we mean by that?  Lets take a communism as an example. It was based on Karl Marx theory. It was idealistic idea of how society could work. 
              Communists who were trying to apply that idea into the real world were ignoring all the facts and just blindly followed an unrealistic ideals which led to the 
              terrible, very ineffective and unfair system, full of corruption with lack of freedom and incompetent people in the leading roles. Not forget to mention mass killings and political prisoners of communist regime. Communists were totally ignoring mentality of the individuals, mentality of society as a whole and they were trying to force this unnatural system to work. It didn’t, obviously. 
              Moral of the story? You should be realistic in applying big ideals. 
              So idealistic ideas of how society should work must be applied step by step while society is evolving and going into the direction of  those big ideals
              but it’s not an overnight process. 
              Ideal scenario of applying idealism in the real world is that majority of society adopt some big ideals and then step by step works to move into that direction. Even if it never get to the final step, but it would still moves our civilisation to the next level. 
              Our <strong>goal</strong> is promoting a lot of Hippie ideals and bring back that 70’s kind of mood back. Our Society needs this optimism and faith in the bigger good, free spirit and unity now more than ever. We believe that teenagers raised in that spirit will become better human beings, makes our society better, and lead civilisation to the next level. Next stage of the society where borders are just symbolical, differences in culture, race, religion and nationality are not source of conflicts but the reason for a celebration of our beautiful diversity. World will be as one, resources are divided more equally into the world and main target will be sustainability and keeping our planet healthy, not GDP growth of any country. Again, that kind of theory might sound utopical but we believe it could happen, not in short horizon, but one day in a future and our mission is trying to influence as many people as possible to try to help our society to go into that direction. Our world today would sound totally unbelievable and utopical for people hundreds of years ago too, so there is no limit of how much growth could civilisation do in the future. 
              We as a world, we basically don’t even have another option. If we continue in a spirit of dividing ourselves from each other and every country will play for themselves, then world will be destroyed really quickly. We have a huge environmental challenges in front of us and now we can’t hide from them anymore, if our world don’t act as a one and we keep dividing ourselves and countries follow just their own interest, then the world will inevitably
              collapse. <br />
            <strong>So hop on our Peace Train and lets get that 70’s spirit back</strong></p>
        </div>
      </div>
    )
  }
}

export default About