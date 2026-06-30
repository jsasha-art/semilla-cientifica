import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean
  gradient?: boolean
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, gradient, hover, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "rounded-lg bg-[#F8F9FC] p-6 border border-gray-100",
          glass && "bg-white/80 backdrop-blur-md border border-white/20",
          gradient && "bg-gradient-to-br from-[#7C4DFF]/5 to-[#4D9FFF]/5",
          hover && "cursor-pointer transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = "Card"

export { Card }