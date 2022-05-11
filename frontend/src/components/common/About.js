import React from 'react'
import {seo, mainMetaDescription} from '../../lib/functions'

class About extends React.Component {
  state = {
  }

  async componentDidMount () {
    try {
      window.scrollTo(0, 0)

      seo({
        title: "About Nu Hippies",
        metaDescription: {mainMetaDescription}
      });

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="about-page change-brightness">
          
        <div className="form-wrapper">

          <div className="about-banner">

            <h1 className="big-name-about">
              NU HIPPIES MOVEMENT
            </h1>

            <div className="about-side-slogan">

              <h2>
                Bring Hippies Back
              </h2>

            </div>

          </div>

          <div className="story-header">Long Story Short</div>
          <p>
          We are Nu Hippies Movement and our goal is to bring the Hippies kind of spirit back. The world is facing big environmental problems,
          overpopulation, and war conflicts. A big majority of people today are focusing only on their individual success and image on social 
          media. Society is lacking idealistic views when individuals are not only thinking of their own success but also of helping society and 
          the planet and seeing the world as one. Right now we are just starting and our main job is selling fair trade, environmentally friendly 
          clothes, and high-quality health supplements. We hope to keep growing and start organizing speeches with like-minded speakers, debates,
          and even festivals. Let’s join us on our journey to BRING HIPPIES BACK  
          </p>

          <div className="story-header">Long Story Longer</div>

          <p>
          We are Nu Hippies Movement, and we believe that the world needs a Hippie kind of spirit right now more than ever. 
              There are a lot of conflicts and environmental problems. Predictions for a future don’t look good.
              It’s a pretty pessimistic time right now as we don’t have solutions or maybe we do 
              but we don’t have a will to solve big environmental problems. Young people don’t have that idealistic way of thinking
              as young people of the ’60s and ’70s. Kids are raised with dreams of being successful in terms of money and career but there is no 
              idealism in them anymore, no activism, no ambition to do something for a greater good. Of course, there are still people like that, 
              but it&#39;s a very small percentage compared to Hippie times. 
              How is our movement different from original Hippies? 
              We are trying to combine Hippie Idealism with rational thinking. 
              What do we mean by that?  Let&#39;s take communism as an example. It was based on Karl Marx&#39;s theory. It was an idealistic idea of how 
              society could work. 
              Communists who were trying to apply that idea to the real world were ignoring all the facts and just blindly followed an unrealistic ideal 
              which led to a terrible, very ineffective, and unfair system, full of corruption with a lack of freedom and incompetent people in the leading roles. 
              Not forget to mention the mass killings and political prisoners of the communist regime. Communists were ignoring the mentality of the 
              individuals, the mentality of society as a whole and they were trying to force this unnatural system to work. It didn’t, obviously. 
              The moral of the story is? You should be realistic in applying big ideals. 
              So idealistic ideas of how society should work must be applied step by step while society is evolving and going in the direction of  
              those big ideals
              but it’s not an overnight process. 
              The ideal scenario of applying idealism in the real world is that the majority of society adopts some big ideals and then step by step works 
              to move in that direction. Even if it never gets to the final step, it would still move our civilization to the next level. 
              Our <strong>goal</strong> is to promote a lot of Hippie ideals and bring back that 70’s kind of mood back. Our Society needs this optimism 
              and faith in the bigger good, free spirit, and unity now more than ever. We believe that teenagers raised in that spirit will become adults who make our world a better place and lead civilization to the next level. In the next stage of the society where borders are just 
              symbolic, differences in culture, race, religion, and nationality are not a source of conflict but the reason for a celebration of our 
              beautiful diversity. The world will be one, resources are divided more equally in the world and the main target will be sustainability and 
              keeping our planet healthy, not the GDP growth of any country. Again, that kind of theory might sound utopic but we believe it could happen, 
              not in the short horizon, but one day in the future and our mission is trying to influence as many people as possible to try to help our 
              society to go into that direction. Our world today would sound totally unbelievable and utopic to people hundreds of years ago too, so 
              there is no limit to how much growth could civilisation do in the future. 
              We as a world, basically don’t even have another option. If we continue in a spirit of dividing ourselves from each other and every country 
              will play for themselves, then the world will be destroyed quickly. We have huge environmental challenges in front of us and now we can’t
              hide from them anymore if our world doesn’t act like one and we keep dividing ourselves and countries follow just their own interest, then 
              the world will inevitably
              collapse. <br />
            <strong>So hop on our Peace Train and let&#39;s get that ’70s spirit back</strong></p>
        </div>
      </div>
    )
  }
}

export default About