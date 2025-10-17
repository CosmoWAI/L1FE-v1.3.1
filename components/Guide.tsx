import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { GuideSuggestion } from '../types';
import { Stat } from '../types';
import Button from './Button';
import Textarea from './Textarea';
import { GuideIcon, StrengthIcon, MindIcon, SpiritIcon, WealthIcon, RelationIcon, QuestIcon } from './Icons';

const Guide: React.FC = () => {
    const [suggestions, setSuggestions] = useState<GuideSuggestion[]>([]);
    const [reflection, setReflection] = useState('');
    const [reflectionResponse, setReflectionResponse] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [isReflecting, setIsReflecting] = useState(false);
    const [error, setError] = useState('');

    const handleSuggestQuests = async () => {
        setError('');
        setIsSuggesting(true);
        setSuggestions([]);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const suggestionSchema = {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: "The title of the quest." },
                    description: { type: Type.STRING, description: "A brief description of the quest." },
                    statTarget: { type: Type.STRING, enum: Object.values(Stat), description: "The primary stat this quest targets." }
                  },
                  required: ['title', 'description', 'statTarget']
                }
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: "I am a user of the L1FE gamification app. My recent focus has been on improving my MIND and SPIRIT stats. Please suggest three new, creative quests I could undertake today. They should be actionable, specific, and fun.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: suggestionSchema,
                }
            });

            const jsonString = response.text;
            const parsedSuggestions = JSON.parse(jsonString);
            setSuggestions(parsedSuggestions);

        } catch (e) {
            console.error(e);
            setError('Could not get suggestions from the Guide. Please try again.');
        } finally {
            setIsSuggesting(false);
        }
    };

    const handleReflect = async () => {
        if (!reflection.trim()) return;
        setError('');
        setIsReflecting(true);
        setReflectionResponse('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are a wise and encouraging AI guide named L1FE Guide. A user has shared this reflection with you: "${reflection}". Respond with 1-2 lines of wisdom, empathy, or encouragement. Keep it concise, impactful, and speak in the first person (e.g., "I believe you can...").`,
            });
            setReflectionResponse(response.text);

        } catch (e) {
            console.error(e);
            setError('The Guide is currently unavailable for reflection. Please try again later.');
        } finally {
            setIsReflecting(false);
        }
    };

    const getStatColorClasses = (stat: Stat) => {
        const colors: Record<Stat, string> = {
            [Stat.Strength]: 'border-energy-pulse/50 text-energy-pulse',
            [Stat.Mind]: 'border-blue-400/50 text-blue-300',
            [Stat.Spirit]: 'border-purple-400/50 text-purple-300',
            [Stat.Wealth]: 'border-teal-mint-start/50 text-teal-mint-start',
            [Stat.Relation]: 'border-pink-400/50 text-pink-300',
        };
        return colors[stat] || 'border-support-shade/50 text-support-shade';
    };

    const getStatIcon = (stat: Stat) => {
        const icons: Record<Stat, React.ReactNode> = {
            [Stat.Strength]: <StrengthIcon className="w-6 h-6" />,
            [Stat.Mind]: <MindIcon className="w-6 h-6" />,
            [Stat.Spirit]: <SpiritIcon className="w-6 h-6" />,
            [Stat.Wealth]: <WealthIcon className="w-6 h-6" />,
            [Stat.Relation]: <RelationIcon className="w-6 h-6" />,
        };
        return icons[stat] || <QuestIcon className="w-6 h-6" />;
    };

    return (
        <div className="bg-panel-bg backdrop-blur-sm border border-secondary-highlight/20 rounded-xl shadow-highlight p-6">
            <div className="flex items-center gap-3 mb-6">
                <GuideIcon className="w-8 h-8 text-secondary-highlight" />
                <h3 className="text-3xl font-serif font-bold">Your AI Guide</h3>
            </div>
            
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quest Suggestions */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-soft-neutral">Quest Suggestions</h4>
                    <p className="text-sm text-support-shade">Feeling unsure what to do next? Let your guide suggest a path forward.</p>
                    <Button onClick={handleSuggestQuests} disabled={isSuggesting} variant="primary">
                        {isSuggesting ? 'Thinking...' : 'Suggest Quests'}
                    </Button>
                    {isSuggesting && <div className="text-center p-4 text-support-shade">Loading suggestions...</div>}
                    <div className="space-y-3 pt-2">
                        {suggestions.map((s, i) => (
                            <div key={i} className={`p-4 rounded-lg border bg-primary-deep/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-primary-deep/80 ${getStatColorClasses(s.statTarget)}`}>
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 ${getStatColorClasses(s.statTarget)}`}>{getStatIcon(s.statTarget)}</div>
                                    <div>
                                        <p className="font-bold text-soft-neutral">{s.title}</p>
                                        <p className="text-sm text-support-shade">{s.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reflections */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-soft-neutral">Daily Reflection</h4>
                    <p className="text-sm text-support-shade">Share your thoughts, feelings, or progress. Your guide is here to listen.</p>
                    <Textarea 
                        label="What's on your mind?"
                        name="reflection"
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        placeholder="Today I learned..."
                    />
                    <Button onClick={handleReflect} disabled={isReflecting || !reflection.trim()} variant="secondary">
                        {isReflecting ? 'Reflecting...' : 'Reflect with Guide'}
                    </Button>
                     {isReflecting && <div className="text-center p-4 text-support-shade">The guide is pondering...</div>}
                    {reflectionResponse && (
                         <div className="pt-2">
                            <p className="text-accent-aura font-semibold">Guide's Insight:</p>
                            <p className="italic text-support-shade bg-primary-deep/50 p-3 rounded-md">{reflectionResponse}</p>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Guide;