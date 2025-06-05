import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration
      }
    }
  };
};

// Fade in up animation
export const fadeInUp = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Fade in down animation
export const fadeInDown = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Fade in left animation
export const fadeInLeft = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Fade in right animation
export const fadeInRight = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Scale animation
export const scaleUp = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration
      }
    }
  };
};

// Stagger children animation
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

// Card hover animation
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.5,
      type: 'tween',
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
    transition: {
      duration: 0.4,
      type: 'tween',
      ease: 'easeOut'
    }
  }
};

// Button hover animation
export const buttonHover: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      type: 'tween',
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.15,
      type: 'tween',
      ease: 'easeOut'
    }
  }
};

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Path drawing animation
export const pathDraw = (delay: number = 0, duration: number = 1.5): Variants => {
  return {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay,
          duration,
          ease: 'easeInOut'
        },
        opacity: {
          delay,
          duration: 0.2
        }
      }
    }
  };
};

// Image hover animation
export const imageHover: Variants = {
  rest: {
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.05,
    filter: 'brightness(1.1)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

// Skill bar animation
export const skillBar = (delay: number = 0): Variants => {
  return {
    hidden: {
      width: '0%'
    },
    visible: {
      width: '100%',
      transition: {
        delay,
        duration: 1,
        ease: 'easeOut'
      }
    }
  };
};