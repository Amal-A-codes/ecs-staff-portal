import { motion } from "framer-motion";
import { companyNews } from '../utils/employeeData';

export default function ArticleDetails({ articleId, onBack }) {
  const article = companyNews.find(a => a.id === articleId);

  if (!article) {
    return <div className="p-12 text-center">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-12 shadow-lg"
        >
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full">
              {article.category}
            </span>
            <span className="text-slate-500">{article.source}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{article.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Divider */}
          <div className="border-t border-slate-200 my-8"></div>

          {/* Full Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed mb-6">
              In a groundbreaking development for the UK tech sector, NovaByte Solutions has been recognised as a 
              leader in workplace innovation and employee development. This recognition comes at a time when British companies 
              are reimagining their approach to talent management and organisational culture in the post-pandemic landscape.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              The London-headquartered company's unique approach combines cutting-edge technology with human-centred design principles, 
              creating an environment where employees can thrive both professionally and personally. This methodology 
              has resulted in unprecedented levels of employee satisfaction and productivity across their UK offices.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">Leading UK Innovation</h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              NovaByte's transformation strategy focuses on three core pillars: continuous learning, collaborative 
              innovation, and sustainable growth. These principles have been integrated into every aspect of the 
              organisation, from onboarding processes at their London headquarters to leadership development programmes 
              delivered across their regional offices in Manchester, Edinburgh, and Birmingham.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              Industry analysts from across Europe note that NovaByte's success stems from its commitment to investing in people 
              alongside technology. The company has allocated significant resources to employee development programmes, 
              resulting in a workforce that is both highly skilled and deeply engaged with the company's mission to transform 
              British businesses through innovative solutions.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">Expanding Across the UK</h2>

            <p className="text-slate-700 leading-relaxed mb-6">
              As NovaByte continues to expand its operations across the United Kingdom and into European markets, the company 
              remains committed to maintaining its distinctive culture and values. Leadership has announced plans to scale 
              these innovative practices across all new locations, with particular focus on supporting the growing tech 
              ecosystems in Northern England and Scotland.
            </p>

            <p className="text-slate-700 leading-relaxed">
              This recognition serves as validation of NovaByte's vision and sets a new standard for the UK technology sector. 
              As other British organisations look to emulate this success, NovaByte continues to push the boundaries of 
              what's possible in workplace innovation, cementing the UK's position as a global leader in technological advancement 
              and employee-centric business practices.
            </p>
          </div>
        </motion.article>
      </div>
    </div>
  );
}