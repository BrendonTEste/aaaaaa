import React from 'react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Play, ArrowRight, X, Clock } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

const BlogList = () => {
  const { getPublishedPosts, incrementPostViews } = useBlog();
  const posts = getPublishedPosts();
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleReadMore = (post: any) => {
    setSelectedPost(post);
    incrementPostViews(post.id);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{paragraph.replace('## ', '')}</h2>;
      }
      if (paragraph.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-6">{paragraph.replace('# ', '')}</h1>;
      }
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{paragraph.replace('- ', '')}</li>;
      }
      if (/^\d+\./.test(paragraph.trim())) {
        return <li key={index} className="ml-6 mb-2 list-decimal">{paragraph.replace(/^\d+\.\s*/, '')}</li>;
      }
      return <p key={index} className="mb-4 leading-relaxed text-gray-700">{paragraph}</p>;
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Blog <span className="text-purple-200">Vaca Roxa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-purple-100 max-w-3xl mx-auto"
          >
            Fique por dentro das últimas novidades, tendências e inovações na análise de leite e tecnologia láctea
          </motion.p>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Tag className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Em breve, novos conteúdos!</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Estamos preparando conteúdos incríveis sobre tecnologia láctea e inovações do setor.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.videoUrl && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-purple-600 ml-1" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <motion.button
                      onClick={() => handleReadMore(post)}
                      className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      Ler mais
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Quer saber mais sobre o Vaca Roxa?
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Descubra como nossa tecnologia pode revolucionar sua análise de leite
          </p>
          <motion.button
            onClick={() => window.location.href = '/'}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Conhecer o Sistema
          </motion.button>
        </div>
      </motion.section>
      </div>

      {/* Modal for full post */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedPost.publishedAt)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.ceil(selectedPost.content.length / 1000)} min de leitura
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {selectedPost.title}
                </h1>
              </div>
              <button
                onClick={closeModal}
                className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Featured Image */}
              {selectedPost.featuredImage && (
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedPost.featuredImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedPost.videoUrl && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => window.open(selectedPost.videoUrl, '_blank')}
                        className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      >
                        <Play className="w-10 h-10 text-purple-600 ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                {/* Excerpt */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                  <p className="text-lg text-purple-800 font-medium italic">
                    {selectedPost.excerpt}
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {formatContent(selectedPost.content)}
                </div>

                {/* Tags */}
                {selectedPost.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Publicado em {formatDate(selectedPost.publishedAt)} por {selectedPost.author}
              </div>
              <button
                onClick={closeModal}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default BlogList;