import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, ScrollView, TextInput, Pressable, StyleSheet } from 'react-native';

const C = { ink: '#171717', muted: '#77756F', line: '#E9E5DC', paper: '#F7F3EA', white: '#FFFFFF', yellow: '#F2D48E', lilac: '#E9E6F7', green: '#E1EBDD', orange: '#F1E1D3' };
const projects = [
  { title: 'Campus energy monitor', field: 'SUSTAINABILITY', school: 'Northbridge University', team: '3 / 5 members', time: '4 days ago', color: C.green, mark: 'E', status: 'Recruiting', tags: ['IoT', 'Energy'] },
  { title: 'Accessible study planner', field: 'EDTECH', school: 'Westlake College', team: '2 / 4 members', time: 'Yesterday', color: C.lilac, mark: 'A', status: 'Recruiting', tags: ['React Native', 'Design'] },
  { title: 'Local food exchange', field: 'COMMUNITY', school: 'Riverside Institute', team: '4 / 6 members', time: '1 week ago', color: C.orange, mark: 'F', status: 'In progress', tags: ['Research', 'Mobile'] },
];
const categories = ['All projects', 'Technology', 'Design', 'Research'];

function Action({ children, onPress, light = false, style }) {
  return <Pressable onPress={onPress} style={[styles.action, light && styles.actionLight, style]}><Text style={[styles.actionText, light && styles.actionTextLight]}>{children}</Text></Pressable>;
}
function ProjectCard({ project, saved, onSave, onOpen }) {
  return <View style={styles.projectCard}>
    <View style={styles.cardTop}><View style={[styles.projectMark, { backgroundColor: project.color }]}><Text style={styles.markText}>{project.mark}</Text></View><Pressable onPress={onSave} style={styles.saveButton}><Text style={styles.saveIcon}>{saved ? '★' : '☆'}</Text></Pressable></View>
    <Text style={styles.eyebrow}>{project.field}</Text><Text style={styles.cardTitle}>{project.title}</Text><Text style={styles.school}>{project.school}</Text>
    <View style={styles.tags}>{project.tags.map(tag => <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>)}</View>
    <View style={styles.cardFoot}><Text style={styles.meta}>{project.team} · {project.time}</Text><Pressable onPress={onOpen}><Text style={styles.arrow}>↗</Text></Pressable></View>
  </View>;
}
function Home({ onOpen, savedIds, toggleSave, query, setQuery, category, setCategory }) {
  const filtered = useMemo(() => projects.filter(p => {
    const matchesSearch = `${p.title} ${p.field} ${p.school} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All projects' || (category === 'Technology' && p.tags.some(t => ['IoT', 'React Native', 'Mobile'].includes(t))) || (category === 'Design' && p.tags.includes('Design')) || (category === 'Research' && p.tags.includes('Research'));
    return matchesSearch && matchesCategory;
  }), [query, category]);
  return <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
    <View style={styles.topline}><Text style={styles.brand}>FIELDNOTE<Text style={styles.brandDot}>.</Text></Text><View style={styles.avatar}><Text style={styles.avatarText}>K</Text></View></View>
    <View style={styles.welcome}><Text style={styles.eyebrow}>MONDAY, NOVEMBER 23</Text><Text style={styles.heading}>Good work{\n}starts together.</Text><Text style={styles.subheading}>Find a student project worth building.</Text></View>
    <View style={styles.stats}><View><Text style={styles.statNumber}>128</Text><Text style={styles.statLabel}>OPEN PROJECTS</Text></View><View style={styles.statDivider}/><View><Text style={styles.statNumber}>42</Text><Text style={styles.statLabel}>CAMPUSES</Text></View><View style={styles.statDivider}/><View><Text style={styles.statNumber}>316</Text><Text style={styles.statLabel}>STUDENTS</Text></View></View>
    <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Find your next project</Text><Text style={styles.sectionNote}>A good team changes everything.</Text></View>
    <View style={styles.search}><Text style={styles.searchGlyph}>⌕</Text><TextInput placeholder="Search projects, skills, campuses" placeholderTextColor="#99968E" value={query} onChangeText={setQuery} style={styles.searchInput}/><Text style={styles.filterGlyph}>☷</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{categories.map(item => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.categoryActive]}><Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text></Pressable>)}</ScrollView>
    <View style={styles.projectHeading}><Text style={styles.sectionTitle}>Open projects</Text><Text style={styles.resultCount}>{filtered.length} opportunities</Text></View>
    {filtered.map(p => <ProjectCard key={p.title} project={p} saved={savedIds.includes(p.title)} onSave={() => toggleSave(p.title)} onOpen={() => onOpen(p)}/>)}
    {!filtered.length && <View style={styles.empty}><Text style={styles.cardTitle}>No matches yet</Text><Text style={styles.meta}>Try a different search term.</Text></View>}
    <View style={styles.callout}><Text style={styles.eyebrow}>HAVE AN IDEA?</Text><Text style={styles.calloutTitle}>Make it a team project.</Text><Text style={styles.calloutBody}>Share your brief and meet students who can help bring it to life.</Text><Action onPress={() => onOpen({ title: 'Start a project', field: 'PROJECT BRIEF', school: 'Tell the community what you are building.', team: 'Add your university', time: 'Takes about 3 minutes', color: C.yellow, mark: '+', status: 'Create a listing', tags: ['Idea', 'Team'] })}>Post a project</Action></View>
  </ScrollView>;
}
function Detail({ project, onBack, onJoin }) {
  if (!project) return null;
  return <ScrollView contentContainerStyle={styles.content}><Pressable onPress={onBack} style={styles.back}><Text style={styles.backText}>←  Back to projects</Text></Pressable><View style={[styles.detailArt, { backgroundColor: project.color }]}><Text style={styles.detailLetter}>{project.mark}</Text><Text style={styles.detailLabel}>STUDENT COLLABORATION</Text></View><Text style={styles.eyebrow}>{project.field}</Text><Text style={styles.detailTitle}>{project.title}</Text><Text style={styles.school}>{project.school}</Text><View style={styles.detailStats}><Text style={styles.detailMeta}>{project.team}</Text><Text style={styles.detailMeta}>{project.status}</Text></View><Text style={styles.sectionTitle}>About this project</Text><Text style={styles.body}>A student-led collaboration bringing different perspectives together to solve a real campus challenge. Join the team to contribute your skills, learn by doing, and build something useful.</Text><Text style={styles.sectionTitle}>Looking for</Text><View style={styles.tags}>{project.tags.map(t => <View style={styles.tag} key={t}><Text style={styles.tagText}>{t}</Text></View>)}</View><Action onPress={onJoin}>Request to join</Action><Text style={styles.helper}>Your request will be shared with the project lead.</Text></ScrollView>;
}

export default function App() {
  const [detail, setDetail] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All projects');
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = title => setSavedIds(ids => ids.includes(title) ? ids.filter(i => i !== title) : [...ids, title]);
  const open = p => setDetail(p);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.paper}/>
      {detail ? (
        <Detail project={detail} onBack={() => setDetail(null)} onJoin={() => setDetail(null)} />
      ) : (
        <Home onOpen={open} savedIds={savedIds} toggleSave={toggleSave} query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper }, content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 36 },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 }, brand: { color: C.ink, fontSize: 15, letterSpacing: 2.6, fontWeight: '800' }, brandDot: { color: '#B38A32' }, avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: C.ink, fontWeight: '700', fontSize: 14 }, welcome: { marginBottom: 24 }, eyebrow: { color: C.muted, fontSize: 10, letterSpacing: 1.7, fontWeight: '700', marginBottom: 10 }, heading: { fontSize: 36, lineHeight: 39, color: C.ink, fontWeight: '600', letterSpacing: -1.3 }, subheading: { fontSize: 14, color: C.muted, marginTop: 10, lineHeight: 21 },
  stats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 19, paddingHorizontal: 4, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, marginBottom: 31 }, statNumber: { fontSize: 23, fontWeight: '600', color: C.ink, marginBottom: 4 }, statLabel: { fontSize: 8, letterSpacing: 1.1, color: C.muted, fontWeight: '700' }, statDivider: { height: 32, width: 1, backgroundColor: C.line }, sectionHeader: { marginBottom: 14 }, sectionTitle: { fontSize: 19, fontWeight: '600', color: C.ink, letterSpacing: -.4 }, sectionNote: { color: C.muted, fontSize: 12, marginTop: 4 }, search: { height: 50, borderWidth: 1, borderColor: C.line, backgroundColor: C.white, borderRadius: 25, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 14 }, searchGlyph: { fontSize: 23, color: C.muted, marginRight: 9 }, searchInput: { flex: 1, color: C.ink, fontSize: 12 }, filterGlyph: { fontSize: 19, color: C.ink }, categoryRow: { gap: 8, paddingBottom: 28 }, category: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: C.line, backgroundColor: 'transparent' }, categoryActive: { backgroundColor: C.ink, borderColor: C.ink }, categoryText: { color: C.muted, fontSize: 11 }, categoryTextActive: { color: C.white }, projectHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }, resultCount: { color: C.muted, fontSize: 11 },
  projectCard: { backgroundColor: C.white, borderRadius: 19, borderWidth: 1, borderColor: '#EFEBE3', padding: 16, marginBottom: 12 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 17 }, projectMark: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, markText: { fontSize: 21, fontWeight: '600', color: C.ink }, saveButton: { width: 34, height: 34, borderRadius: 17, borderColor: C.line, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, saveIcon: { fontSize: 19, color: C.ink }, cardTitle: { color: C.ink, fontWeight: '600', fontSize: 18, letterSpacing: -.3, marginBottom: 5 }, school: { color: C.muted, fontSize: 12 }, tags: { flexDirection: 'row', gap: 7, marginTop: 14, marginBottom: 15 }, tag: { backgroundColor: C.paper, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 }, tagText: { color: '#57554F', fontSize: 10 }, cardFoot: { borderTopWidth: 1, borderColor: '#F0EDE7', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, meta: { color: C.muted, fontSize: 11 }, arrow: { fontSize: 20, color: C.ink },
  callout: { backgroundColor: C.yellow, padding: 20, borderRadius: 18, marginTop: 10, marginBottom: 20 }, calloutTitle: { color: C.ink, fontSize: 22, fontWeight: '600', marginBottom: 8 }, calloutBody: { color: '#5D5545', fontSize: 12, lineHeight: 18, marginBottom: 15 }, action: { height: 48, backgroundColor: '#111111', borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22, marginTop: 18 }, actionText: { color: C.white, fontSize: 14, fontWeight: '600' }, actionLight: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line }, actionTextLight: { color: C.ink }, empty: { padding: 22, borderRadius: 16, backgroundColor: C.white, borderWidth: 1, borderColor: C.line, marginTop: 16 },
  back: { paddingVertical: 8, marginBottom: 18 }, backText: { color: C.muted, fontSize: 13 }, detailArt: { height: 180, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 25 }, detailLetter: { fontSize: 72, color: C.ink, fontWeight: '600' }, detailLabel: { color: '#504B3F', fontSize: 9, letterSpacing: 2, fontWeight: '700', marginTop: 4 }, detailTitle: { fontSize: 32, lineHeight: 36, color: C.ink, fontWeight: '600', letterSpacing: -1, marginBottom: 8 }, detailStats: { flexDirection: 'row', gap: 9, marginVertical: 22 }, detailMeta: { color: C.ink, fontSize: 11, backgroundColor: C.white, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 8 }, body: { color: C.muted, fontSize: 13, lineHeight: 21, marginTop: 9, marginBottom: 23 }, helper: { textAlign: 'center', color: C.muted, fontSize: 10, marginTop: 10 },
});
