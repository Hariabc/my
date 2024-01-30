import React from 'react'
import {motion,useScroll} from 'framer-motion'

export default function ScrollAnimation() {
    const {ScrollYProgress}=useScroll()
    return (
        <>
      <motion.div
          style={{
            scaleX:ScrollYProgress,
            position:"fixed",
            top:0,
            right:0,
            left:0,
            height:10,
            transformOrigin:"0% 0%",
            backgroundColor:"blue"
          }}
      >
      </motion.div>
      </>
    )
}
