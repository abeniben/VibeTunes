import Link from 'next/link';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: string;
  actionText?: string;
}

export default function EmptyState({ title, description, action, actionText }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="mb-4 text-5xl">🎵</div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        {description}
      </p>
      
      {action && actionText && (
        <Link
          href={action}
          className="px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors inline-flex"
        >
          {actionText}
        </Link>
      )}
    </motion.div>
  );
}