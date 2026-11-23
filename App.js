import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';

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

export default function App() {
  const [savedIds, setSavedIds] = useState([]);
  const toggleSave = title => setSavedIds(ids => ids.includes(title) ? ids.filter(i => i !== title) : [...ids, title]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={C.paper} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topline}><Text style={styles.brand}>FIELDNOTE<Text style={styles.brandDot}>.</Text></Text><View style={styles.avatar}><Text style={styles.avatarText}>K</Text></View></View>
        <View style={styles.welcome}><Text style={styles.eyebrow}>CAMPUS PROJECTS</Text><Text style={styles.heading}>Student Projects Platform</Text><Text style={styles.subheading}>Discover and collaborate on innovative campus initiatives.</Text></View>
        <View style={styles.projectHeading}><Text style={styles.sectionTitle}>Featured projects</Text><Text style={styles.resultCount}>{projects.length} opportunities</Text></View>
        {projects.map(p => <ProjectCard key={p.title} project={p} saved={savedIds.includes(p.title)} onSave={() => toggleSave(p.title)} onOpen={() => {}} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.paper }, content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 36 },
  topline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 }, brand: { color: C.ink, fontSize: 15, letterSpacing: 2.6, fontWeight: '800' }, brandDot: { color: '#B38A32' }, avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: C.ink, fontWeight: '700', fontSize: 14 }, welcome: { marginBottom: 24 }, eyebrow: { color: C.muted, fontSize: 10, letterSpacing: 1.7, fontWeight: '700', marginBottom: 10 }, heading: { fontSize: 36, lineHeight: 39, color: C.ink, fontWeight: '600', letterSpacing: -1.3 }, subheading: { fontSize: 14, color: C.muted, marginTop: 10, lineHeight: 21 },
  sectionTitle: { fontSize: 19, fontWeight: '600', color: C.ink, letterSpacing: -.4 },
  projectHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }, resultCount: { color: C.muted, fontSize: 11 },
  projectCard: { backgroundColor: C.white, borderRadius: 19, borderWidth: 1, borderColor: '#EFEBE3', padding: 16, marginBottom: 12 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 17 }, projectMark: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, markText: { fontSize: 21, fontWeight: '600', color: C.ink }, saveButton: { width: 34, height: 34, borderRadius: 17, borderColor: C.line, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, saveIcon: { fontSize: 19, color: C.ink }, cardTitle: { color: C.ink, fontWeight: '600', fontSize: 18, letterSpacing: -.3, marginBottom: 5 }, school: { color: C.muted, fontSize: 12 }, tags: { flexDirection: 'row', gap: 7, marginTop: 14, marginBottom: 15 }, tag: { backgroundColor: C.paper, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 }, tagText: { color: '#57554F', fontSize: 10 }, cardFoot: { borderTopWidth: 1, borderColor: '#F0EDE7', paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, meta: { color: C.muted, fontSize: 11 }, arrow: { fontSize: 20, color: C.ink },
  action: { height: 48, backgroundColor: '#111111', borderRadius: 25, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22, marginTop: 18 }, actionText: { color: C.white, fontSize: 14, fontWeight: '600' }, actionLight: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line }, actionTextLight: { color: C.ink },
});
