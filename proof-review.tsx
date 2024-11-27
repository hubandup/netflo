import React, { useState } from 'react';
import { 
  MessageSquare, ThumbsUp, ThumbsDown, Eye, 
  Plus, X, Download, Share2, History, 
  PenTool, Pipette, Move, MousePointer 
} from 'lucide-react';

const ProofReview = () => {
  const [currentTool, setCurrentTool] = useState('cursor');
  const [comments, setComments] = useState([]);
  const [version, setVersion] = useState(1);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Banner_Homepage_V{version}.pdf</h1>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                >
                  <History size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Download size={20} />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                onClick={() => {/* Rejeter le BAT */}}
              >
                <ThumbsDown size={16} className="mr-2" />
                Rejeter
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                onClick={() => {/* Approuver le BAT */}}
              >
                <ThumbsUp size={16} className="mr-2" />
                Approuver
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b p-2">
          <div className="flex items-center space-x-2">
            {[
              { id: 'cursor', icon: MousePointer, label: 'Sélection' },
              { id: 'move', icon: Move, label: 'Déplacer' },
              { id: 'pen', icon: PenTool, label: 'Annoter' },
              { id: 'colorPicker', icon: Pipette, label: 'Pipette' },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setCurrentTool(tool.id)}
                className={`p-2 rounded ${
                  currentTool === tool.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={tool.label}
              >
                <tool.icon size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 relative overflow-auto">
          <div className="h-full flex items-center justify-center bg-gray-200">
            <div className="bg-white shadow-lg w-3/4 aspect-video relative">
              {/* Placeholder for document preview */}
              <img 
                src="/api/placeholder/1200/800" 
                alt="Document preview" 
                className="w-full h-full object-cover"
              />
              
              {/* Annotations overlay */}
              <div className="absolute inset-0">
                {comments.map((comment, index) => (
                  <CommentMarker 
                    key={index}
                    comment={comment}
                    onDelete={(id) => setComments(comments.filter(c => c.id !== id))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">-</button>
            <span className="text-sm">100%</span>
            <button className="p-1 hover:bg-gray-100 rounded">+</button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Comments */}
      <div className="w-80 bg-white border-l flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Commentaires</h2>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                onDelete={(id) => setComments(comments.filter(c => c.id !== id))}
              />
            ))}
          </div>
        </div>

        {/* New comment */}
        <div className="p-4 border-t">
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">SM</span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Ajouter un commentaire..."
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                  Annuler
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Commenter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version History Sidebar */}
      {showVersionHistory && (
        <div className="absolute inset-y-0 right-80 w-64 bg-white border-l shadow-lg">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Versions</h2>
            <button 
              onClick={() => setShowVersionHistory(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {[
                { version: 3, date: '2024-03-15', status: 'current' },
                { version: 2, date: '2024-03-14', status: 'archived' },
                { version: 1, date: '2024-03-13', status: 'archived' }
              ].map((v, index) => (
                <button
                  key={index}
                  className={`w-full p-3 rounded-lg border ${
                    v.version === version ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setVersion(v.version)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Version {v.version}</div>
                      <div className="text-sm text-gray-500">{v.date}</div>
                    </div>
                    {v.status === 'current' && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Actuelle
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentMarker = ({ comment, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer">
        {comment.number}
      </div>

      {isHovered && (
        <div className="absolute left-full ml-2 top-0 bg-white rounded-lg shadow-lg p-2 w-48">
          <div className="text-sm">{comment.text}</div>
        </div>
      )}
    </div>
  );
};

const CommentCard = ({ comment, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border p-3">
      <div className="flex items-start space-x-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium">{comment.author.initials}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-sm text-gray-500 ml-2">{comment.timestamp}</span>
            </div>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm mt-1">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ProofReview;